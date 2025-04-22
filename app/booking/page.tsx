import { BookingStepper, StepperProgress } from "@/components/booking";
import DisclaimerBanner from "@/components/ui/banner/DisclaimerBanner";

const page = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-y-10 sm:gap-x-10">
        <div className=" bg-white col-span-12 md:col-span-3 rounded-xl shadow-lg p-2">
          <StepperProgress />
        </div>
        <div className="bg-white col-span-12 md:col-span-9 rounded-xl shadow-lg">
          <BookingStepper />
        </div>
      </div>
    </div>
  );
};

export default page;
