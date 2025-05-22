import DisclaimerBanner from "@/components/ui/banner/DisclaimerBanner";
import BookingSteps from "@/components/booking/BookingSteps";
import ContiueBtn from "@/components/ui/buttons/ContinueBtn";
import BackBtn from "@/components/ui/buttons/BackBtn";

interface BookingStepperProps {
  servicesPromise: Promise<any>;
}

const BookingStepper = ({ servicesPromise }: BookingStepperProps) => {
  return (
    <div className="">
      <form className="p-2">
        <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-around">
          <BackBtn />
          <DisclaimerBanner />
        </div>
        <BookingSteps servicesPromise={servicesPromise} />
        <div className="p-2 sm:flex sm:justify-end">
          <ContiueBtn />
        </div>
      </form>
    </div>
  );
};

export default BookingStepper;
