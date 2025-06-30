import { Skeleton } from '@heroui/react';

const SelectVehicleSkeleton = () => {
  return (
    <>
      {/* Vehicle Preview Box Skeleton */}
      <div className="flex justify-center items-center my-2 p-28 rounded-lg bg-slate-200/50">
        <Skeleton className="w-40 h-6 rounded-md">
          <div className="w-40 h-6 bg-default-300 rounded-md" />
        </Skeleton>
      </div>

      {/* Label Skeleton */}
      <Skeleton className="w-52 h-4 rounded-md mb-2">
        <div className="w-52 h-4 bg-default-300 rounded-md" />
      </Skeleton>

      {/* Dropdown Skeleton */}
      <div className="mt-2 grid grid-cols-1">
        <Skeleton className="h-10 w-full rounded-md">
          <div className="h-10 w-full bg-default-200 rounded-md" />
        </Skeleton>
      </div>
    </>
  );
};

export default SelectVehicleSkeleton;
