"use client";
import { bookingSteps } from "@/lib/placeholder-data";
import { useStepper } from "@/hooks/useStepper";

const StepperProgress = () => {
  const { step } = useStepper();

  return (
    <div>
      <div className="flex justify-center sm:justify-evenly md:flex md:flex-col">
        {bookingSteps.map((item, index) => (
          <div key={item} className="my-4 flex items-center">
            <span
              className={`mr-2 rounded-full text-center ${
                step === index
                  ? "bg-blue-400 text-white px-4 py-2 sm:px-3 sm:py-1 text-md sm:text-sm"
                  : "bg-gray-300 text-gray-400 hidden sm:block sm:px-3 sm:py-1 sm:text-sm"
              }`}
            >
              {index + 1}
            </span>

            <p
              className={` sm:text-sm font-bold ${
                step === index
                  ? "sm:block text-blue-400 text-2xl"
                  : "hidden sm:block text-gray-300"
              }`}
            >
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepperProgress;
