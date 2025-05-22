"use client";
import { useEffect, useState } from "react";
import { PackageCard } from "@/components/ui";
import { detailMenu } from "@/lib/placeholder-data";
import { useBookingInfo } from "@/hooks/useBookingInfo";
import { vehicleBasedPricing } from "@/lib/vehicleBasedPricing";

const SelectPackage = () => {
  const [services, setServices] = useState([]);
  const { bookingInfo, setBookingInfo } = useBookingInfo();
  const { selectedVehicle } = bookingInfo;

  // FETCH SERVICES - this could be listed above component
  const fetchServices = async () => {
    const { selectedVehicle } = bookingInfo;
    const response = await fetch("/api/square/listServices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // <- important
      },
      body: JSON.stringify({ selectedVehicle }),
    });
    const data = response.json();
    return data;
  };

  useEffect(() => {
    // vehicleBasedPricing(selectedVehicle);
    fetchServices().then((data) => console.log(data));
  }, []);
  console.log(selectedVehicle);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {detailMenu.map((item, index) => (
          <div key={index}>
            <PackageCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectPackage;
