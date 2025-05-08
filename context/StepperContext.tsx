"use client";
import { createContext, useState } from "react";

export type StepperContextType = {
  step: number;
  setStep: (step: any) => void;
};

export const StepperContext = createContext<StepperContextType | undefined>(
  undefined
);

const StepperProvider = ({ children }: { children: React.ReactNode }) => {
  const [step, setStep] = useState<number>(0);

  return (
    <>
      <StepperContext.Provider value={{ step, setStep }}>
        {children}
      </StepperContext.Provider>
    </>
  );
};

export default StepperProvider;
