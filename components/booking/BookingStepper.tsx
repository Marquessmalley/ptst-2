"use client";
import { useStepper } from "@/hooks/useStepper";
import SelectVehicle from "./SelectVehicle";
import SelectPackage from "./SelectPackage";
import SelectDateTime from "./SelectDateTime";
import { useBookingInfo } from "@/hooks/useBookingInfo";
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
    if (selectedPackage === "") return false;
    return true;
  };
  const dateTimeSelected = () => {
    const { selectedDateTime } = bookingInfo;
    if (selectedDateTime === "") return false;
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
      case 1:
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

        <div className="p-2 flex justify-end">
          <button
            type="button"
            className="font-bold p-2 bg-slate-700 hover:bg-slate-900 transition duration-200 text-white w-36 rounded-2xl my-2"
            disabled={step === 3 ? true : false}
            onClick={handleNext}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingStepper;
