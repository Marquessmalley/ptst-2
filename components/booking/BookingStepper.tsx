"use client";
import { useState } from "react";
import { useStepper } from "@/hooks/useStepper";
import { useBookingInfo } from "@/hooks/useBookingInfo";
import dayjs from "dayjs";
import SelectVehicle from "./SelectVehicle";
import SelectPackage from "./SelectPackage";
import SelectDateTime from "./SelectDateTime";
import BookingSummary from "./BookingSummary";
import DisclaimerBanner from "@/components/ui/banner/DisclaimerBanner";
import {
  vehicleTypeSelected,
  packageSelected,
  dateTimeSelected,
  userInfoSubmitted,
} from "@/lib/utils/bookingValidations";
import { formatTimeFromRFC3339 } from "@/lib/utils/formatRFC3339";
import { BookingInfo } from "@/lib/definitions/definitions";
import { useRouter } from "next/navigation";

const BookingStepper = () => {
  const router = useRouter();
  const [availableDates, setAvailableDates] = useState([]);
  const { step, setStep } = useStepper();
  const { bookingInfo, setBookingInfo } = useBookingInfo();

  const fecthAvailabilities = async () => {
    const response = await fetch("api/square/searchAvailabilities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...bookingInfo,
        selectedDate: `${dayjs()
          .hour(9)
          .minute(0)
          .second(0)
          .millisecond(0)
          .format("YYYY-MM-DDTHH:mm:ss.SSS")}Z`,
      }),
    });

    const data = response.json();
    return data;
  };

  const createBooking = async () => {
    const response = await fetch("/api/square/createBooking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
        }
        break;
      case 1:
        if (packageSelected(bookingInfo)) {
          setStep((prevState: number) => prevState + 1);
          setBookingInfo((prevState: BookingInfo) => ({
            ...prevState,
            selectedDate: ` ${dayjs()
              .hour(9)
              .minute(0)
              .second(0)
              .millisecond(0)
              .format("YYYY-MM-DDTHH:mm:ss.SSS")}Z`,
          }));
          // Fetch availabilities
          fecthAvailabilities()
            .then((data) => {
              const formattedTime =
                data.availabilities.length > 0 &&
                data.availabilities.map((date: any) => {
                  return {
                    ...date,
                    startAt: formatTimeFromRFC3339(date.startAt),
                  };
                });
              setAvailableDates(formattedTime);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        break;
      case 2:
        if (dateTimeSelected(bookingInfo)) {
          setStep((prevState: number) => prevState + 1);
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
              className="font-bold p-1 bg-slate-700 hover:bg-slate-900 transition duration-200 text-white rounded-2xl cursor-pointer"
              disabled={step === 0 ? true : false}
              onClick={handleBack}
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
          <div>
            <SelectVehicle />
          </div>
        )}
        {step === 1 && (
          <div>
            <SelectPackage />
          </div>
        )}
        {step === 2 && (
          <div>
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
            className="font-bold p-2 bg-slate-800 hover:bg-slate-900 transition duration-200 text-white w-full sm:w-44 rounded-2xl my-2 cursor-pointer text-nowrap"
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
