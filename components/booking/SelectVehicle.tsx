const SelectVehicle = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center">Select Your Vehicle</h2>

      <div className="bg-gray-800 p-24 my-2 rounded-lg">
        <p className="text-white">Vehicle Preview</p>
      </div>
      <label
        htmlFor="country"
        className="block text-sm/6 font-medium text-gray-900"
      >
        Select Your Vehicle
      </label>
      <div className="mt-2 grid grid-cols-1">
        <select
          id="country"
          name="country"
          autoComplete="country-name"
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        >
          <option>Sedan</option>
          <option>SUV(2 Rows)</option>
          <option>SUV(3 Rows)</option>
          <option>Truck</option>
        </select>
      </div>
    </div>
  );
};

export default SelectVehicle;
