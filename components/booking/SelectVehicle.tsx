import Image from "next/image";
import { useBookingInfo } from "@/hooks/useBookingInfo";

const SelectVehicle = () => {
  const { bookingInfo, setBookingInfo } = useBookingInfo();
  const { selectedVehicle } = bookingInfo;

  const handleVehicleSelect = (event: any) => {
    setBookingInfo((prevState: any) => ({
      ...prevState,
      selectedVehicle: event.target.value,
    }));
  };

  return (
    <div className="p-4">
      {selectedVehicle !== "" ? (
        <>
          <div className=" flex justify-center items-center my-2 p-10 rounded-lg">
            <Image
              src={`/vehicles/${selectedVehicle}.png`}
              alt=""
              width={500}
              height={500}
            />
          </div>
        </>
      ) : (
        <>
          <div className=" flex justify-center items-center my-2 p-28 rounded-lg bg-slate-100">
            <p className="font-bold text-lg sm:text-2xl text-black">
              Vehicle Preview
            </p>
          </div>
        </>
      )}

      <label htmlFor="" className="block text-sm/6 font-bold text-gray-900">
        Select Your Vehicle
      </label>
      <div className="mt-2 grid grid-cols-1">
        <select
          id="vehicle"
          name="vehicle"
          className="col-start-1 row-start-1 w-full font-bold appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          onChange={(e) => handleVehicleSelect(e)}
          value={selectedVehicle}
        >
          <option value="">-- Select a vehicle type --</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV(2 Rows)">SUV(2 Rows)</option>
          <option value="SUV(3 Rows)">SUV(3 Rows)</option>
          <option value="Truck">Truck</option>
        </select>
      </div>
    </div>
  );
};

export default SelectVehicle;
