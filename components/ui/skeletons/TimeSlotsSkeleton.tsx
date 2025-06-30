import { Skeleton } from '@heroui/react';

const TimeSlotsSkeleton = () => {
  return (
    <div className="my-2 mx-2 grid grid-cols-1 gap-y-2 max-h-[260px] overflow-scroll">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="w-full">
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
      ))}
    </div>
  );
};

export default TimeSlotsSkeleton;
