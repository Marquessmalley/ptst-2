import { use } from "react";
interface SelectPackageProps {
  servicesPromise: Promise<any>;
}

const SelectPackage = async ({ servicesPromise }: SelectPackageProps) => {
  const services = use(servicesPromise);

  console.log("services", services);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {/* {detailMenu.map((item, index) => (
          <div key={index}>
            <PackageCard item={item} />
          </div>
        ))} */}
        {services.data.map((item: any) => (
          <div key={item.id}>
            <p>{item.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectPackage;
