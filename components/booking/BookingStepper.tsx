"use client";
import { useStepper } from "@/hooks/useStepper";
import SelectVehicle from "./SelectVehicle";

const BookingStepper = () => {
  const { step } = useStepper();

  return (
    <div>
      <form>
        {step === 0 && (
          <div>
            <SelectVehicle />
          </div>
        )}
      </form>
    </div>
  );
};

export default BookingStepper;
