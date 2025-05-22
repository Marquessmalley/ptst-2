"use client";
import { useStepper } from "@/hooks/useStepper";
import { useBookingInfo } from "@/hooks/useBookingInfo";
import {
  vehicleTypeSelected,
  packageSelected,
  dateTimeSelected,
} from "@/lib/bookingValidations";

const ContiueBtn = () => {
  const { step, setStep } = useStepper();
  const { bookingInfo } = useBookingInfo();

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
        }
        break;
      case 2:
        if (dateTimeSelected(bookingInfo)) {
          setStep((prevState: number) => prevState + 1);
        } else {
          console.log(dateTimeSelected(bookingInfo));
        }
        break;
      default:
        break;
    }
  };
  return (
    <button
      type="button"
      className="font-bold p-2 bg-slate-800 hover:bg-slate-900 transition duration-200 text-white w-full sm:w-44 rounded-2xl my-2 cursor-pointer text-nowrap"
      disabled={step === 3 ? true : false}
      onClick={handleNext}
    >
      {step == 3 ? <>Book Appointment</> : <>Continue</>}
    </button>
  );
};

export default ContiueBtn;
