import { Skeleton } from "@heroui/react";

const VehicleImageSkeleton = () => {
  return (
    <div className="flex justify-center items-center my-2 p-28 rounded-lg bg-slate-200/50">
      <Skeleton className="w-40 h-6 rounded-md">
        <div className="w-40 h-6 bg-default-300 rounded-md" />
      </Skeleton>
    </div>
  );
};

export default VehicleImageSkeleton;
