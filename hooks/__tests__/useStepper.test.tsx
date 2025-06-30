import { renderHook } from '@testing-library/react';
import { useStepper } from '@/hooks/useStepper';
import StepperProvider from '@/context/StepperContext';

describe('useStepper hook', () => {
  it('Throws a error when hook used outside provider', () => {
    expect(() => renderHook(() => useStepper())).toThrow('No Stepper Context');
  });

  it('Returns the stepper context when wrapped by a provider', () => {
    // Mimics the booking/layout.tsx
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <StepperProvider>{children}</StepperProvider>
    );

    const { result } = renderHook(() => useStepper(), { wrapper });

    expect(result.current).toHaveProperty('step');
    expect(result.current).toHaveProperty('setStep');
    expect(typeof result.current.step).toBe('number');
    expect(typeof result.current.setStep).toBe('function');
  });
});
