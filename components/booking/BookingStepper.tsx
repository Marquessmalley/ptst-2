"use client";
import { useStepper } from "@/hooks/useStepper";
import SelectVehicle from "./SelectVehicle";
import SelectService from "./SelectService";
import { useBookingInfo } from "@/hooks/useBookingInfo";

const BookingStepper = () => {
  const { step, setStep } = useStepper();
  const { bookingInfo } = useBookingInfo();

  const vehicleTypeSelected = () => {
    const { selectedVehicle } = bookingInfo;
    if (selectedVehicle === "") return false;
    return true;
  };
  const serviceSelected = () => {
    const { selectedService } = bookingInfo;
    if (selectedService === "") return false;
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
        if (serviceSelected()) {
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
      <form>
        {step === 0 && (
          <div>
            <SelectVehicle />
          </div>
        )}
        {step === 1 && (
          <div>
            <SelectService />
          </div>
        )}

        <div className="p-2 flex justify-between">
          <button
            type="button"
            className="font-bold p-2 bg-blue-400 text-white w-36 rounded-2xl"
            disabled={step === 0 ? true : false}
            onClick={handleBack}
          >
            Back
          </button>
          <button
            type="button"
            className="font-bold p-2 bg-gradient-to-b from-blue-400 to-orange-400 text-white w-36 rounded-2xl"
            disabled={step === 3 ? true : false}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingStepper;
