import { useEffect, useRef, useState } from 'react';
import { PackageCard } from '@/components/ui';
import { useBookingInfo } from '@/hooks/useBookingInfo';
import PackageCardSkeleton from '@component/ui/skeletons/PackageCardSkeleton';
import { vehicleBasedPricing } from '@/lib/utils/vehicleBasedPricing';
import { listServices } from '@/lib/actions/sqaure';
import { useDisclosure } from '@heroui/react';
import RecommenderModal from './recommender/RecommenderModal';
import { animate } from 'animejs';

const SelectPackage = () => {
  const [services, setServices] = useState([1, 2, 3, 4, 5, 6]);
  const [loading, setLoading] = useState<boolean>(true);
  const { bookingInfo, setBookingInfo } = useBookingInfo();
  const { selectedVehicle } = bookingInfo;

  const { onOpen, isOpen, onOpenChange, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (btnRef.current) {
      animate(btnRef.current, {
        boxShadow: [
          '0 0 0px 0px rgba(56,189,248,0.4)',
          '0 0 12px 4px rgba(56,189,248,0.5)',
          '0 0 0px 0px rgba(56,189,248,0.4)',
        ],
        duration: 2000,
        loop: true,
        ease: 'inOutSine',
      });
    }
  }, [loading]);

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
          ref={btnRef}
          type="button"
          onClick={onOpen}
          className="rounded-full border border-sky-500 px-4 py-1.5 text-xs font-semibold text-sky-600 transition hover:bg-sky-50 sm:text-sm"
        >
          ✨ Help me choose
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
      <RecommenderModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        services={services}
      />
    </div>
  );
};

export default SelectPackage;
