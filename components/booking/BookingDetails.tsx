import { client } from "@/lib/api/sqaure";
import { Divider } from "@heroui/react";
import Image from "next/image";
import { replace } from "@/lib/utils/bigIntHandler";
import { formatTimeFromRFC3339 } from "@/lib/utils/formatRFC3339";

export default async function BookingDetails({ id }: { id: string }) {
  const bookingData = await client.bookings.get({ bookingId: id });

  if (!bookingData.booking) {
    throw new Error("Booking is missing in the booking data.");
  }
  const { status, customerId, startAt } = bookingData.booking;

  console.log(startAt);

  if (!startAt) {
    throw new Error("startAt date is missing");
  }

  if (!bookingData.booking.appointmentSegments) {
    throw new Error("Appointment is missing in the booking data.");
  }
  const { serviceVariationId } = bookingData.booking.appointmentSegments[0];

  if (!customerId) {
    throw new Error("Customer ID is missing in the booking data.");
  }

  const customerData = await client.customers.get({ customerId });

  if (!serviceVariationId) {
    throw new Error("Service variation id is missing");
  }

  const serviceData = await client.catalog.object.get({
    objectId: serviceVariationId,
    includeRelatedObjects: true,
  });

  if (!serviceData.relatedObjects) {
    throw new Error("Related object is missing");
  }

  const serviceStringified = JSON.stringify(
    serviceData.relatedObjects[0],
    replace
  );

  const parseDServiceData = JSON.parse(serviceStringified);

  const { name } = parseDServiceData.itemData;

  return (
    <div className="">
      {/* Top */}
      <div className="grid grid-cols-1 place-items-center mb-10">
        <div className="flex items-center my-2">
          <h2 className="font-bold text-4xl text-gray-700">
            Appointment{" "}
            {status &&
              status
                .charAt(0)
                .toUpperCase()
                .concat(status.slice(1).toLocaleLowerCase())}
          </h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="green"
            className="size-6 bg-white border rounded-full h-10 w-10 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </div>
        <p className=" text-sm font-semibold text-gray-700">
          Thank you for choosing our car detailing service.
        </p>
      </div>

      {/* MIDDLE */}
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border">
        <div className="grid grid-cols-2">
          <div className="col-span-1 mx-6 my-1">
            <h3 className="font-bold text-xl text-gray-700">Booking Summary</h3>
            <p className="font-normal text-md text-gray-700">
              Booking ID: #{id}{" "}
            </p>
          </div>

          <p className="justify-self-end mx-6 my-2 bg-green-200 text-green-500 font-semibold rounded-3xl w-24 text-center h-7">
            {status &&
              status
                .charAt(0)
                .toUpperCase()
                .concat(status.slice(1).toLocaleLowerCase())}
          </p>
        </div>

        <Divider className="my-4" />

        <div className="grid grid-cols-2 ">
          <div className="mx-6 my-2">
            <p className="font-semibold">Service Details</p>
            <div className="flex items-center my-2">
              <Image
                src="/wash.png"
                alt=""
                width={28}
                height={28}
                className="bg-blue-400 p-1 rounded-full"
              />
              <div>
                <p className="font-normal text-sm text-gray-700 ml-1">{name}</p>
              </div>
            </div>
            <div className="flex items-center my-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-7 text-white bg-blue-400 rounded-full p-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <div>
                <p className="font-normal text-sm text-gray-700 ml-1">
                  {formatTimeFromRFC3339(startAt)}
                </p>
              </div>
            </div>
          </div>
          <div className="mx-6 my-2">
            <p className="font-semibold">Contact Information</p>
          </div>
        </div>
      </div>
    </div>
  );
}
