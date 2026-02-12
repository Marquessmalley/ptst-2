'use client';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/react';
import Image from 'next/image';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from '@heroui/react';
import { useBookingInfo } from '@/hooks/useBookingInfo';
import { currencyFormatter } from '@/lib/utils/currencyFormatter';
import { durationFormatter } from '@/lib/utils/durationFormatter';

const PackageCard = ({ item }: { item: any }) => {
  const { name, description } = item;
  const { id, version } = item.variations;
  const { priceMoney, serviceDuration, teamMemberIds } =
    item.variations.itemVariationData;

  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const { bookingInfo, setBookingInfo } = useBookingInfo();
  const { selectedPackage } = bookingInfo;

  const handlePackageSelect = (event: any) => {
    setBookingInfo((prevState: any) => ({
      ...prevState,
      selectedPackage: {
        name,
        price: priceMoney.amount,
        serviceDuration,
        variationId: id,
        variationVersion: version,
        teamMembers: teamMemberIds,
      },
    }));
  };
  const serviceList = description.split('\n');

  return (
    <>
      <Card
        isBlurred
        shadow="lg"
        className={`whitespace- max-w-[300px] rounded-xl border py-4 shadow-lg ${
          selectedPackage.name === name
            ? 'border-sky-500 !bg-slate-200'
            : 'bg-slate-50'
        }`}
      >
        <CardHeader className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="rounded-xl object-cover"
            src="/car-spray.jpg"
            width={270}
            height={270}
          />
        </CardHeader>
        <CardBody className="">
          <div className="flex justify-between">
            <p className="max-w-[125px] whitespace-normal break-words text-xs font-bold sm:text-sm">
              {name}
            </p>
            <p className="text-xs font-semibold text-sky-500 sm:text-base">
              {currencyFormatter(priceMoney.amount)}
            </p>
          </div>

          <div className="my-2 flex w-fit items-center justify-start rounded-xl border bg-slate-100 px-2 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 sm:size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <p className="ml-1 text-xs font-bold sm:text-sm">
              {durationFormatter(serviceDuration)}
            </p>
          </div>

          <p
            className="my-2 cursor-pointer text-xs font-semibold text-sky-500 sm:text-sm"
            onClick={onOpen}
          >
            View Services
          </p>
        </CardBody>
        <CardFooter>
          <button
            type="button"
            className="w-full rounded-lg border bg-slate-700 p-2 text-xs font-bold text-white shadow-lg transition duration-200 hover:bg-slate-900 sm:text-base"
            onClick={handlePackageSelect}
            value={name}
          >
            Select
          </button>
        </CardFooter>
      </Card>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="rounded-xl border shadow-lg"
        backdrop="blur"
        hideCloseButton
      >
        <ModalContent className="h-fit bg-white backdrop-blur-md">
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-sky-400 p-3">
                  <Image src="/wash.png" alt="" width={20} height={26} />
                </div>
                <p className="ml-1">{name} Services</p>
              </ModalHeader>
              <ModalBody className="">
                <div className="">
                  {serviceList.map((service: any) => (
                    <div key={service}>
                      {(service.trim() === 'Interior:' ||
                        service.trim() === 'Exterior:') && (
                        <h3 className="text-lg font-bold sm:my-2">{service}</h3>
                      )}

                      {service.trim() !== 'Interior:' &&
                        service.trim() !== 'Exterior:' && (
                          <div
                            key={service}
                            className="flex items-center sm:my-1"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-5 text-sky-500"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <p className="text-md ml-1 font-semibold">
                              {service}
                            </p>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PackageCard;
