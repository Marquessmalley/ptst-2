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
        className={`py-4 max-w-[300px] rounded-xl shadow-lg  border whitespace-  ${
          selectedPackage.name === name
            ? '!bg-slate-200 border-sky-500'
            : 'bg-slate-50'
        }`}
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
            <p className="text-sm font-bold  break-words whitespace-normal max-w-[125px]">
              {name}
            </p>
            <p className="text-md font-semibold text-sky-500">
              {currencyFormatter(priceMoney.amount)}
            </p>
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
            <p className="text-sm font-bold ml-1">
              {durationFormatter(serviceDuration)}
            </p>
          </div>

          <p
            className="text-sm font-semibold text-sky-500 cursor-pointer my-2"
            onClick={onOpen}
          >
            View Services
          </p>
        </CardBody>
        <CardFooter>
          <button
            type="button"
            className="bg-slate-700 hover:bg-slate-900 transition duration-200 p-2 border text-md font-bold text-white w-full rounded-lg shadow-lg"
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
        className=" border shadow-lg rounded-xl"
        backdrop="blur"
        hideCloseButton
      >
        <ModalContent className="bg-white backdrop-blur-md h-fit">
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
                        <h3 className="font-bold text-lg sm:my-2">{service}</h3>
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
                            <p className="font-semibold text-md ml-1">
                              {service}
                            </p>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
                {/* <div className="">
                  <h3 className="font-bold text-lg sm:my-2">Exterior: </h3>
                  {services.exterior?.map((service) => (
                    <div key={service} className="flex items-center my-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-5 text-blue-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="font-semibold text-md ml-1">{service}</p>
                    </div>
                  ))}
                </div> */}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PackageCard;
