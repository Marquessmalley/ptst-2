import { render } from "@testing-library/react";
import Page from "@/app/booking/page";
import StepperProvider from "@/context/StepperContext";
import { BookingProvider } from "@/context/BookingContext";

// Have to mock useRouter bc our testing environment doesn't contain App router context so it doesn't know what useRouter is.
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Booking page", () => {
  it("Checks if Stepper Progress and Booking Stepper is in the document.", () => {
    // Because components in page uses contexts I have to wrap my providers around the page.
    const { getByTestId } = render(
      <BookingProvider>
        <StepperProvider>
          <Page />
        </StepperProvider>
      </BookingProvider>,
    );

    const stepperProgress = getByTestId("stepperProgress");
    const bookingStepper = getByTestId("bookingStepper");

    expect(stepperProgress).toBeInTheDocument();
    expect(bookingStepper).toBeInTheDocument();
  });
});
