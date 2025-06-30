import StepperProvider from '@/context/StepperContext';
import { BookingProvider } from '@/context/BookingContext';

const BookingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <BookingProvider>
        <StepperProvider>{children}</StepperProvider>
      </BookingProvider>
    </>
  );
};

export default BookingLayout;
