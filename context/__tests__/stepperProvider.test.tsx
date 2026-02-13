import { useStepper } from '@/hooks/useStepper';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StepperProvider from '@/context/StepperContext';

const DummyComponent = () => {
  const { step, setStep } = useStepper();
  const incrementStep = () => setStep((prevStep: number) => prevStep + 1);
  return (
    <>
      <p data-testid="step">{step}</p>
      <button onClick={incrementStep}>Add</button>
    </>
  );
};

describe('Stepper Provider Test', () => {
  it('Provides the context default value', () => {
    const { getByText } = render(
      <StepperProvider>
        <DummyComponent />
      </StepperProvider>,
    );

    const step = getByText('0');

    expect(step).toBeInTheDocument();
  });

  it('updates the step value when button clicked', async () => {
    const { getByRole, getByTestId } = render(
      <StepperProvider>
        <DummyComponent />
      </StepperProvider>,
    );

    const incrementBtn = getByRole('button', { name: 'Add' });
    await userEvent.click(incrementBtn);

    const step = getByTestId('step').textContent;
    expect(step).toBe('1');
  });
});
