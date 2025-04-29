import { PackageCard } from "@/components/ui";
import { detailMenu } from "@/lib/placeholder-data";

const SelectPackage = () => {
  console.log(detailMenu);
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-2">
        {detailMenu.map((x, index) => (
          <div key={index}>
            <PackageCard />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectPackage;
