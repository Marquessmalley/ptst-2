import StepperProvider from "@/context/StepperContext";
import { BookingProvider } from "@/context/BookingContext";
import DisclaimerBanner from "@/components/ui/banner/DisclaimerBanner";

const BookingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <BookingProvider>
        <StepperProvider>
          <DisclaimerBanner />
          {children}
        </StepperProvider>
      </BookingProvider>
    </div>
  );
};

export default BookingLayout;
