import { PackageCard } from "@/components/ui";
import { detailMenu } from "@/lib/placeholder-data";
import { useBookingInfo } from "@/hooks/useBookingInfo";

const SelectPackage = () => {
  const { bookingInfo, setBookingInfo } = useBookingInfo();

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
