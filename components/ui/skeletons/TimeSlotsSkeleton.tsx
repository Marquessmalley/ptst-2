import { Skeleton } from "@heroui/react";

const TimeSlotsSkeleton = () => {
  return (
    <div className="mx-2 my-2 grid max-h-[260px] grid-cols-1 gap-y-2 overflow-scroll">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="w-full">
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
      ))}
    </div>
  );
};

export default TimeSlotsSkeleton;
