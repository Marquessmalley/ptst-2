import { BookingStepper, StepperProgress } from "@/components/booking";

const page = () => {
  return (
    <div>
      <div className="flex justify-center items-start">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-y-10 sm:gap-x-10">
          <div className=" bg-white/10 backdrop-blur-lg col-span-12 md:col-span-3 rounded-xl shadow-lg p-2 self-start border mt-6 sm:mt-0 m-3 md:m-0">
            <StepperProgress />
          </div>
          <div className="bg-white/10 backdrop-blur-lg col-span-12 md:col-span-9 rounded-xl shadow-2xl border m-3 md:m-0">
            <BookingStepper />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
