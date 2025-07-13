const DisclaimerBanner = () => {
  return (
    <div className="m-2 flex justify-center py-2">
      <div className="flex w-fit items-center justify-center rounded-2xl bg-white px-2 py-2">
        <div className="flex flex-wrap items-center">
          <p className="text-center text-xs font-bold text-gray-900 sm:text-sm">
            🔔 Estimated price — subject to change after inspection or service
            adjustments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerBanner;
