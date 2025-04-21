"use client";
import { useStepper } from "@/hooks/useStepper";
import SelectVehicle from "./SelectVehicle";

const BookingStepper = () => {
  const { step } = useStepper();

  return (
    <div className="">
      <form>
        {step === 0 && (
          <div>
            <SelectVehicle />
          </div>
        )}

        <div className="p-2 flex justify-between">
          <button className="font-bold p-2 bg-blue-400 text-white w-36 rounded-2xl">
            Back
          </button>
          <button className="font-bold p-2 bg-gradient-to-b from-blue-400 to-orange-400 text-white w-36 rounded-2xl">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingStepper;
