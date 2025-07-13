'use client';
import { bookingSteps } from '@/lib/data/placeholder-data';
import { useStepper } from '@/hooks/useStepper';

const StepperProgress = () => {
  const { step } = useStepper();

  return (
    <div className="">
      <div className="flex justify-center sm:justify-evenly md:flex md:flex-col">
        {bookingSteps.map((item, index) => (
          <div key={item} className="flex items-center sm:my-4">
            <span
              className={`mr-2 rounded-full text-center ${
                step === index
                  ? 'text-md bg-sky-400 px-3 py-1 text-white sm:px-3 sm:py-1 sm:text-sm'
                  : 'hidden bg-gray-300 text-gray-400 sm:block sm:px-3 sm:py-1 sm:text-sm'
              }`}
            >
              {index + 1}
            </span>

            <p
              className={`font-bold sm:text-sm ${
                step === index
                  ? 'text-xl text-sky-400 sm:block sm:text-2xl'
                  : 'hidden text-gray-300 sm:block'
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
