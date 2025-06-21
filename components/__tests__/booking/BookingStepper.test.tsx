import BookingStepper from "@/components/booking/BookingStepper";
import { render } from "@testing-library/react";
import StepperProvider from "@/context/StepperContext";
import { BookingProvider } from "@/context/BookingContext";

// Required to mock next/router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock useStepper to control step
jest.mock("../../../hooks/useStepper", () => ({
  useStepper: () => ({
    step: 0,
    setStep: jest.fn(),
  }),
}));

describe("Booking Stepper Component", () => {
  it("does not render previous button when step is 0", () => {
    const { queryByTestId } = render(
      <BookingProvider>
        <StepperProvider>
          <BookingStepper />
        </StepperProvider>
      </BookingProvider>
    );

    const previousBtn = queryByTestId("previousBtn");
    expect(previousBtn).toBeNull();
  });

  it("renders SelectVehicle Component when step is 0", () => {
    const { getByTestId } = render(
      <BookingProvider>
        <StepperProvider>
          <BookingStepper />
        </StepperProvider>
      </BookingProvider>
    );

    const selectVehicle = getByTestId("selectVehicle");
    expect(selectVehicle).toBeInTheDocument();
  });
});
