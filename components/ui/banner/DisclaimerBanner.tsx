const DisclaimerBanner = () => {
  return (
    <div className="py-6 flex justify-center m-2">
      <div className="flex w-fit justify-center items-center rounded-2xl bg-white py-2 px-2 ">
        <div className="flex flex-wrap items-center">
          <p className=" text-sm sm:text-sm/6 font-bold text-gray-900 text-center">
            🔔 Estimated price — subject to change after inspection or service
            adjustments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerBanner;
