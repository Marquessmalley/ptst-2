import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import Image from "next/image";
import { DetailMenuItem } from "@/lib/definitions";

const PackageCard = ({ item }: { item: DetailMenuItem }) => {
  const { packageName, startingPrice, estimatedTime } = item;
  return (
    <Card
      isBlurred
      shadow="lg"
      className="py-4 max-w-[300px] rounded-xl shadow-lg  border bg-slate-50"
    >
      <CardHeader className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="/car-spray.jpg"
          width={270}
          height={270}
        />
      </CardHeader>
      <CardBody className="">
        <div className="flex justify-between">
          <p className="text-md font-bold">{packageName}</p>
          <p className="text-md font-semibold text-blue-500">{startingPrice}</p>
        </div>

        <div className="flex bg-slate-100 border justify-start items-center w-fit px-2 shadow-lg rounded-xl my-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <p className="text-sm font-bold ml-1">{estimatedTime}</p>
        </div>

        <p className="text-sm font-semibold text-blue-500 cursor-pointer my-2">
          View Services
        </p>
      </CardBody>
      <CardFooter>
        <button
          type="button"
          className="bg-slate-700 hover:bg-slate-900 transition duration-200 p-2 border text-md font-bold text-white w-full rounded-lg shadow-lg"
        >
          Select
        </button>
      </CardFooter>
    </Card>
  );
};

export default PackageCard;
