import { render } from "@testing-library/react";
import { StepperProgress } from "@/components/booking";
import { bookingSteps } from "@/lib/data/placeholder-data";
import StepperProvider from "@/context/StepperContext";
import { useStepper } from "@/hooks/useStepper";

/* 
I can mock my step context in my unit test bc I am testing this component in isolation
 so I won't need app full mock steup
*/

// Mocking out stepper context
jest.mock("../../../hooks/useStepper", () => ({
  useStepper: () => ({ step: 0 }),
}));

describe("Stepper progress component component", () => {
  it("Checks that all booking steps are rendered", () => {
    const { getByText } = render(
      <StepperProvider>
        <StepperProgress />
      </StepperProvider>
    );

    bookingSteps.forEach((step) => {
      const stepText = getByText(step);
      expect(stepText).toBeInTheDocument();
    });
  });

  it("styles the correct active step", () => {
    const { getByText } = render(
      <StepperProvider>
        <StepperProgress />
      </StepperProvider>
    );

    const stepName = getByText("Select Vehicle");
    const stepNumber = getByText("1");

    expect(stepName).toHaveClass("sm:block text-blue-400 text-2xl");
    expect(stepNumber).toHaveClass(
      "mr-2 rounded-full text-center bg-blue-400 text-white px-3 py-1 sm:px-3 sm:py-1 text-md sm:text-sm"
    );
  });

  it("test that step is a number", () => {
    const mockStepper = require("../../../hooks/useStepper");
    const { step } = mockStepper.useStepper();

    expect(typeof step).toBe("number");
  });
});
