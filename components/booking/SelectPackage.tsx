'use client';
import { useEffect, useState } from 'react';
import { PackageCard } from '@/components/ui';
import { useBookingInfo } from '@/hooks/useBookingInfo';
import PackageCardSkeleton from '@component/ui/skeletons/PackageCardSkeleton';
import { vehicleBasedPricing } from '@/lib/utils/vehicleBasedPricing';

const SelectPackage = () => {
  const [services, setServices] = useState([1, 2, 3, 4, 5, 6]);
  const [loading, setLoading] = useState<boolean>(true);
  const { bookingInfo, setBookingInfo } = useBookingInfo();
  const { selectedVehicle } = bookingInfo;

  const fetchServices = async () => {
    const response = await fetch('/api/square/listServices', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // <- important
      },
    });
    const data = response.json();
    return data;
  };

  useEffect(() => {
    fetchServices()
      .then((data) => {
        // confiure data to only show vehicle prices based on selected vehicle
        setServices(vehicleBasedPricing(selectedVehicle, data));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {loading ? (
          <>
            {services?.map((index) => (
              <div key={index}>
                <PackageCardSkeleton />
              </div>
            ))}
          </>
        ) : (
          <>
            {services.map((item, index) => (
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
