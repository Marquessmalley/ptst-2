import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import Image from "next/image";

const PackageCard = () => {
  return (
    <Card
      isBlurred
      shadow="lg"
      className="py-4 max-w-[300px] rounded-xl shadow-lg  border bg-slate-50"
    >
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Daily Mix</p>
        <small className="text-default-500">12 Tracks</small>
        <h4 className="font-bold text-large">Frontend Radio</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://heroui.com/images/hero-card-complete.jpeg"
          width={270}
          height={270}
        />
      </CardBody>
    </Card>
  );
};

export default PackageCard;
