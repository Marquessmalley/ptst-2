"use client";
import { useStepper } from "@/hooks/useStepper";
import { useBookingInfo } from "@/hooks/useBookingInfo";
import SelectVehicle from "./SelectVehicle";
import SelectPackage from "./SelectPackage";
import SelectDateTime from "./SelectDateTime";
import BookingSummary from "./BookingSummary";
import DisclaimerBanner from "@/components/ui/banner/DisclaimerBanner";

const BookingStepper = () => {
  const { step, setStep } = useStepper();
  const { bookingInfo } = useBookingInfo();

  const vehicleTypeSelected = () => {
    const { selectedVehicle } = bookingInfo;
    if (selectedVehicle === "") return false;
    return true;
  };
  const packageSelected = () => {
    const { selectedPackage } = bookingInfo;
    if (selectedPackage.packageName === "") return false;
    return true;
  };
  const dateTimeSelected = () => {
    const { selectedDate, selectedTime } = bookingInfo;
    if (selectedDate && selectedTime === "") return false;
    return true;
  };

  const handleNext = () => {
    switch (step) {
      case 0:
        if (vehicleTypeSelected()) {
          setStep((prevState: number) => prevState + 1);
        }
        break;
      case 1:
        if (packageSelected()) {
          setStep((prevState: number) => prevState + 1);
        }
        break;
      case 2:
        if (dateTimeSelected()) {
          setStep((prevState: number) => prevState + 1);
        }
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    setStep((prevState: number) => prevState - 1);
  };

  console.log(bookingInfo);

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
            <SelectDateTime />
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
            disabled={step === 3 ? true : false}
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
