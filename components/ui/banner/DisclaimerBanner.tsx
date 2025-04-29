const DisclaimerBanner = () => {
  return (
    <div className="py-6 flex justify-center">
      <div className="flex w-fit justify-center items-center rounded-2xl bg-white px-3 py-2 sm:px-2 sm:py-1">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className=" text-xs sm:text-sm/6 font-bold text-gray-900 whitespace-nowrap">
            🔔 Estimated price — subject to change after inspection or service
            adjustments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerBanner;
