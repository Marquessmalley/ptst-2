"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useBookingInfo } from "@/hooks/useBookingInfo";
import VehicleImageSkeleton from "../ui/skeletons/VehicleImageSkeleton";

const SelectVehicle = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { bookingInfo, setBookingInfo } = useBookingInfo();
  const { selectedVehicle } = bookingInfo;

  const handleVehicleSelect = (event: any) => {
    setBookingInfo((prevState: any) => ({
      ...prevState,
      selectedVehicle: event.target.value,
    }));
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="p-4">
      {selectedVehicle !== "" && !loading ? (
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
          {loading ? (
            <>
              <VehicleImageSkeleton />
            </>
          ) : (
            <div className=" flex justify-center items-center my-2 p-28 rounded-lg bg-slate-200/50">
              <p className="font-bold text-lg sm:text-2xl text-black">
                Vehicle Preview
              </p>
            </div>
          )}
        </>
      )}

      {!loading && (
        <>
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
              <option value="sedan">Sedan</option>
              <option value="suv-2-rows">SUV(2 Rows)</option>
              <option value="suv-3-rows">SUV(3 Rows)</option>
              <option value="truck">Truck</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default SelectVehicle;
