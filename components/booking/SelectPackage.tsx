import { useEffect, useState } from 'react';
import { PackageCard } from '@/components/ui';
import { useBookingInfo } from '@/hooks/useBookingInfo';
import PackageCardSkeleton from '@component/ui/skeletons/PackageCardSkeleton';
import { vehicleBasedPricing } from '@/lib/utils/vehicleBasedPricing';
import { listServices } from '@/lib/actions/sqaure';

const SelectPackage = () => {
  const [services, setServices] = useState([1, 2, 3, 4, 5, 6]);
  const [loading, setLoading] = useState<boolean>(true);
  const { bookingInfo, setBookingInfo } = useBookingInfo();
  const { selectedVehicle } = bookingInfo;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await listServices();
        setServices(vehicleBasedPricing(selectedVehicle, data));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          className="rounded-full border border-sky-500 px-4 py-1.5 text-xs font-semibold text-sky-600 transition hover:bg-sky-50 sm:text-sm"
        >
          Help me choose
        </button>
      </div>
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
