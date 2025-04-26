"use client";
import { bookingSteps } from "@/lib/placeholder-data";
import { useStepper } from "@/hooks/useStepper";

const StepperProgress = () => {
  const { step } = useStepper();

  return (
    <div className="">
      <div className="flex justify-evenly md:flex md:flex-col">
        {bookingSteps.map((item, index) => (
          <div
            key={item}
            className={`my-4 flex items-center ${
              step === index ? "text-blue-400" : "text-gray-300"
            }`}
          >
            <span
              className={`mr-2 px-2  sm:px-3 py-1 rounded-full text-center text-xs sm:text-sm ${
                step === index
                  ? "bg-blue-400 text-white"
                  : "bg-gray-300 text-gray-400"
              }`}
            >
              {index + 1}
            </span>
            <p className="text-xs sm:text-sm font-bold hidden sm:block">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepperProgress;
