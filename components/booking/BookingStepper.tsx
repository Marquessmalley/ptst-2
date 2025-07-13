'use client';
import { useState } from 'react';
import { useStepper } from '@/hooks/useStepper';
import { useBookingInfo } from '@/hooks/useBookingInfo';
import dayjs from 'dayjs';
import SelectVehicle from './SelectVehicle';
import SelectPackage from './SelectPackage';
import SelectDateTime from './SelectDateTime';
import BookingSummary from './BookingSummary';
import DisclaimerBanner from '@/components/ui/banner/DisclaimerBanner';
import {
  vehicleTypeSelected,
  packageSelected,
  dateTimeSelected,
  userInfoSubmitted,
} from '@/lib/utils/bookingValidations';
import { formatTimeFromRFC3339 } from '@/lib/utils/formatRFC3339';
import { BookingInfo } from '@/lib/definitions/definitions';
import { useRouter } from 'next/navigation';
import ErrorAlert from '../ui/alert/ErrorAlert';

const BookingStepper = () => {
  const router = useRouter();
  const [availableDates, setAvailableDates] = useState([]);
  const [error, setError] = useState({ errorType: '', description: '' });

  const { step, setStep } = useStepper();
  const { bookingInfo, setBookingInfo } = useBookingInfo();

  const fecthAvailabilities = async () => {
    const response = await fetch('api/square/searchAvailabilities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...bookingInfo,
        selectedDate: `${dayjs()
          .hour(9)
          .minute(0)
          .second(0)
          .millisecond(0)
          .format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`,
      }),
    });

    const data = response.json();
    return data;
  };

  const createBooking = async () => {
    const response = await fetch('/api/square/createBooking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingInfo),
    });
    const data = response.json();
    return data;
  };

  // FUNCTION THAT CHECKS WHETHER TO GO TO THE NEXT STEP
  const handleNext = () => {
    switch (step) {
      case 0:
        if (vehicleTypeSelected(bookingInfo)) {
          setStep((prevState: number) => prevState + 1);
          setError({
            errorType: '',
            description: '',
          });
        } else {
          setError({
            errorType: 'Vehicle Selection',
            description: 'Please select a vehicle!',
          });
        }
        break;
      case 1:
        if (packageSelected(bookingInfo)) {
          setStep((prevState: number) => prevState + 1);
          setError({
            errorType: '',
            description: '',
          });
          setBookingInfo((prevState: BookingInfo) => ({
            ...prevState,
            selectedDate: ` ${dayjs()
              .hour(9)
              .minute(0)
              .second(0)
              .millisecond(0)
              .format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`,
          }));
          // Fetch availabilities
          fecthAvailabilities()
            .then((data) => {
              const formattedTime =
                data.length > 0
                  ? data.map((date: any) => {
                      return {
                        ...date,
                        startAt: formatTimeFromRFC3339(date.startAt),
                      };
                    })
                  : [];
              setAvailableDates(formattedTime);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          setError({
            errorType: 'Package Selection',
            description: 'Please select a package!',
          });
        }
        break;
      case 2:
        if (dateTimeSelected(bookingInfo)) {
          setStep((prevState: number) => prevState + 1);
          setError({
            errorType: '',
            description: '',
          });
        } else {
          setError({
            errorType: 'Date & Time Selection',
            description: 'Please select a date & time!',
          });
        }
        break;
      case 3:
        // create booking
        if (userInfoSubmitted(bookingInfo)) {
          createBooking()
            .then((data) => {
              const { id } = data.booking.booking;
              // this takes too long, maybe setup a fallback ui
              router.push(`/booking/confirmation/${id}`);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    setStep((prevState: number) => prevState - 1);
  };

  return (
    <div className="">
      <form className="p-2">
        <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-around">
          {step !== 0 && (
            <button
              type="button"
              className="cursor-pointer rounded-2xl bg-slate-700 p-1 font-bold text-white transition duration-200 hover:bg-slate-900"
              disabled={step === 0 ? true : false}
              onClick={handleBack}
              data-testid="previousBtn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                />
              </svg>
            </button>
          )}

          <DisclaimerBanner />
        </div>
        {step === 0 && (
          <div data-testid="selectVehicle">
            {error.errorType === 'Vehicle Selection' && (
              <ErrorAlert
                errorType={error.errorType}
                errorDescription={error.description}
              />
            )}
            <SelectVehicle />
          </div>
        )}
        {step === 1 && (
          <div>
            {error.errorType === 'Package Selection' && (
              <ErrorAlert
                errorType={error.errorType}
                errorDescription={error.description}
              />
            )}
            <SelectPackage />
          </div>
        )}
        {step === 2 && (
          <div>
            {error.errorType === 'Date & Time Selection' && (
              <ErrorAlert
                errorType={error.errorType}
                errorDescription={error.description}
              />
            )}
            <SelectDateTime
              availableDates={availableDates}
              setAvailableDates={setAvailableDates}
            />
          </div>
        )}
        {step === 3 && (
          <div>
            <BookingSummary />
          </div>
        )}

        <div className="p-2 sm:flex sm:justify-end">
          <button
            type="button"
            className="my-2 w-full cursor-pointer text-nowrap rounded-2xl bg-slate-800 p-2 font-bold text-white transition duration-200 hover:bg-slate-900 sm:w-44"
            // disabled={step === 3 ? true : false}
            onClick={handleNext}
          >
            {step == 3 ? <>Book Appointment</> : <>Continue</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingStepper;
