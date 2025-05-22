"use client";
import { useStepper } from "@/hooks/useStepper";

const BackBtn = () => {
  const { step, setStep } = useStepper();

  const handleBack = () => {
    setStep((prevState: number) => prevState - 1);
  };
  return (
    <>
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
    </>
  );
};

export default BackBtn;
