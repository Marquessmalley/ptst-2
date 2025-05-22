"use client";
import { useEffect, useState } from "react";
import { PackageCard } from "@/components/ui";
import { detailMenu } from "@/lib/placeholder-data";
import { useBookingInfo } from "@/hooks/useBookingInfo";
import PackageCardSkeleton from "@component/ui/skeletons/PackageCardSkeleton";

const SelectPackage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { bookingInfo, setBookingInfo } = useBookingInfo();
  const { selectedVehicle } = bookingInfo;

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
    setLoading(false);
    return data;
  };

  useEffect(() => {
    fetchServices().then((data) => setServices(data.data));
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {loading ? (
          <>
            {detailMenu.map((item, index) => (
              <div key={index}>
                <PackageCardSkeleton />
              </div>
            ))}
          </>
        ) : (
          <>
            {detailMenu.map((item, index) => (
              <div key={index}>
                <PackageCard item={item} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default SelectPackage;
