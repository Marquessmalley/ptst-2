"use client";
import { bookingSteps } from "@/lib/placeholder-data";
import { useStepper } from "@/hooks/useStepper";

const StepperProgress = () => {
  const { step } = useStepper();

  return (
    <div className="">
      <div className="flex justify-evenly md:flex md:flex-col">
        {bookingSteps.map((item, index) => (
          <h3
            key={item}
            className={`my-4 text-xs sm:text-sm font-bold flex items-center ${
              step === index ? "text-blue-400" : "text-gray-300"
            }`}
          >
            <span
              className={`mr-2 px-2  sm:px-3 py-1 rounded-full text-center text-xs sm:text-sm ${
                step === index
                  ? "bg-blue-400 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {index + 1}
            </span>
            {item}
          </h3>
        ))}
      </div>
    </div>
  );
};

export default StepperProgress;
