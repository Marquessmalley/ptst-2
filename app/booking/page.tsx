import { BookingStepper, StepperProgress } from '@/components/booking';

const page = () => {
  return (
    <div>
      <div className="flex items-start justify-center">
        <div className="grid w-full max-w-5xl grid-cols-1 sm:gap-x-10 md:grid-cols-12">
          <div
            data-testid="stepperProgress"
            className="col-span-12 m-3 mt-6 self-start rounded-xl border bg-white/10 p-2 shadow-lg backdrop-blur-lg sm:mt-0 md:col-span-3 md:m-0"
          >
            <StepperProgress />
          </div>
          <div
            data-testid="bookingStepper"
            className="col-span-12 m-3 rounded-xl border bg-white/10 shadow-2xl backdrop-blur-lg md:col-span-9 md:m-0"
          >
            <BookingStepper />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
