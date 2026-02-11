import { Skeleton } from "@heroui/react";

const SelectVehicleSkeleton = () => {
  return (
    <>
      {/* Vehicle Preview Box Skeleton */}
      <div className="my-2 flex items-center justify-center rounded-lg bg-slate-200/50 p-28">
        <Skeleton className="h-6 w-40 rounded-md">
          <div className="h-6 w-40 rounded-md bg-default-300" />
        </Skeleton>
      </div>

      {/* Label Skeleton */}
      <Skeleton className="mb-2 h-4 w-52 rounded-md">
        <div className="h-4 w-52 rounded-md bg-default-300" />
      </Skeleton>

      {/* Dropdown Skeleton */}
      <div className="mt-2 grid grid-cols-1">
        <Skeleton className="h-10 w-full rounded-md">
          <div className="h-10 w-full rounded-md bg-default-200" />
        </Skeleton>
      </div>
    </>
  );
};

export default SelectVehicleSkeleton;
