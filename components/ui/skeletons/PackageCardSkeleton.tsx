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
      className="max-w-[300px] rounded-xl border bg-slate-50 py-4 shadow-lg"
    >
      <CardHeader className="overflow-visible py-2">
        <Skeleton className="rounded-xl">
          <div className="h-[180px] w-[270px] rounded-xl bg-default-300" />
        </Skeleton>
      </CardHeader>

      <CardBody className="space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="w-1/3 rounded-lg">
            <div className="h-4 w-full rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-1/4 rounded-lg">
            <div className="h-4 w-full rounded-lg bg-default-200" />
          </Skeleton>
        </div>

        <div className="my-2 flex w-fit items-center justify-start space-x-2 rounded-xl border bg-slate-100 px-2 py-1 shadow-lg">
          <Skeleton className="rounded-full">
            <div className="h-5 w-5 rounded-full bg-default-300" />
          </Skeleton>
          <Skeleton className="w-16 rounded-lg">
            <div className="h-4 w-full rounded-lg bg-default-200" />
          </Skeleton>
        </div>

        <Skeleton className="w-1/2 rounded-lg">
          <div className="h-4 w-full rounded-lg bg-default-200" />
        </Skeleton>
      </CardBody>

      <CardFooter>
        <Skeleton className="w-full rounded-lg">
          <div className="h-10 rounded-lg bg-default-300" />
        </Skeleton>
      </CardFooter>
    </Card>
  );
};

export default PackageCardSkeleton;
