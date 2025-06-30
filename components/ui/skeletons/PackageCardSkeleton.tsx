import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Skeleton,
} from '@heroui/react';

const PackageCardSkeleton = () => {
  return (
    <Card
      isBlurred
      shadow="lg"
      className="py-4 max-w-[300px] rounded-xl shadow-lg border bg-slate-50"
    >
      <CardHeader className="overflow-visible py-2">
        <Skeleton className="rounded-xl">
          <div className="h-[180px] w-[270px] bg-default-300 rounded-xl" />
        </Skeleton>
      </CardHeader>

      <CardBody className="space-y-3">
        <div className="flex justify-between items-center">
          <Skeleton className="w-1/3 rounded-lg">
            <div className="h-4 bg-default-200 rounded-lg w-full" />
          </Skeleton>
          <Skeleton className="w-1/4 rounded-lg">
            <div className="h-4 bg-default-200 rounded-lg w-full" />
          </Skeleton>
        </div>

        <div className="flex bg-slate-100 border justify-start items-center w-fit px-2 py-1 shadow-lg rounded-xl my-2 space-x-2">
          <Skeleton className="rounded-full">
            <div className="h-5 w-5 bg-default-300 rounded-full" />
          </Skeleton>
          <Skeleton className="w-16 rounded-lg">
            <div className="h-4 bg-default-200 rounded-lg w-full" />
          </Skeleton>
        </div>

        <Skeleton className="w-1/2 rounded-lg">
          <div className="h-4 bg-default-200 rounded-lg w-full" />
        </Skeleton>
      </CardBody>

      <CardFooter>
        <Skeleton className="w-full rounded-lg">
          <div className="h-10 bg-default-300 rounded-lg" />
        </Skeleton>
      </CardFooter>
    </Card>
  );
};

export default PackageCardSkeleton;
