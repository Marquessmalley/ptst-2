import { StepperContextType, StepperContext } from '@/context/StepperContext';
import { useContext } from 'react';

export const useStepper = (): StepperContextType => {
  const context = useContext(StepperContext);
  if (!context) throw new Error('No Stepper Context');
  return context;
};
