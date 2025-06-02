import { client } from "@/lib/api/sqaure";
import { Divider } from "@heroui/react";
import Image from "next/image";
import { replace } from "@/lib/utils/bigIntHandler";
import { formatTimeFromRFC3339 } from "@/lib/utils/formatRFC3339";
import { currencyFormatter } from "@/lib/utils/currencyFormatter";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export default async function BookingDetails({ id }: { id: string }) {
  const bookingData = await client.bookings.get({ bookingId: id });

  if (!bookingData.booking) {
    throw new Error("Booking is missing in the booking data.");
  }
  const { status, customerId, startAt } = bookingData.booking;

  if (!startAt) {
    throw new Error("startAt date is missing");
  }

  if (!bookingData.booking.appointmentSegments) {
    throw new Error("Appointment is missing in the booking data.");
  }
  const { serviceVariationId, durationMinutes } =
    bookingData.booking.appointmentSegments[0];

  if (!customerId) {
    throw new Error("Customer ID is missing in the booking data.");
  }

  // CUSTOMER INFO

  const customerData = await client.customers.get({ customerId });

  if (!customerData.customer) {
    throw new Error("No customer data");
  }

  const { givenName, familyName, emailAddress, address } =
    customerData.customer;

  // SERVICE INFO
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

  const serviceVariant = await client.catalog.object.get({
    objectId: serviceVariationId,
  });

  const stringifyServiceVariant = JSON.stringify(serviceVariant, replace);
  const parseDServiceVariant = JSON.parse(stringifyServiceVariant);

  const servicePrice = currencyFormatter(
    parseDServiceVariant.object.itemVariationData.priceMoney.amount
  );

  const vehicleType = parseDServiceVariant.object.itemVariationData.name;

  return (
    <div className="">
      {/* Top */}
      <div className="grid grid-cols-1 place-items-center mb-10">
        <div className="flex items-center my-2 ">
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
            className="size-12 p-1 bg-white border rounded-full  ml-2"
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
          <div className="col-span-1 mx-6 my-4">
            <h3 className="font-bold text-xl text-gray-700">Booking Summary</h3>
            <p className="font-normal text-md text-gray-700">
              Booking ID: #{id}{" "}
            </p>
          </div>

          <p className="justify-self-end mx-6 my-4 bg-green-200 text-green-500 font-semibold rounded-3xl w-24 text-center h-7">
            {status &&
              status
                .charAt(0)
                .toUpperCase()
                .concat(status.slice(1).toLocaleLowerCase())}
          </p>
        </div>

        <Divider className="my-4" />
        <div className="mx-6 my-4 flex justify-between">
          <div className="">
            <p className="text-sm font-semibold text-gray-600">Total Amount:</p>
            <p className="text-2xl font-bold">{servicePrice}</p>
          </div>
          <div
            className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-1 flex items-center max-w-xs"
            role="alert"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.75"
              stroke="currentColor"
              className="size-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>

            <p className="font-normal text-xs ml-2">
              Please remove all personal belongings from your vehicle before
              your appointment
            </p>
          </div>
        </div>
        <Divider className="my-4" />

        <div className="grid grid-cols-1 sm:grid-cols-3 ">
          <div className="mx-6 my-2">
            <p className="font-bold mb-2 text-lg">Service Details</p>
            <div className="flex items-center my-4">
              <Image
                src="/wash.png"
                alt=""
                width={28}
                height={28}
                className="bg-blue-400 p-1 rounded-full"
              />
              <div>
                <p className="font-semibold text-sm text-gray-900 ml-2">
                  Package Selected
                </p>
                <p className="font-normal text-xs text-gray-900 ml-2">{name}</p>
              </div>
            </div>
            <div className="flex items-center my-4">
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
                <p className="font-semibold text-sm text-gray-900 ml-2">
                  {new Date(startAt).toDateString()}
                </p>
                <p className="font-normal text-xs text-gray-700 ml-2">
                  {formatTimeFromRFC3339(startAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center my-4">
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
                <p className="font-semibold text-sm text-gray-900 ml-2">
                  Estimated Duration
                </p>
                <p className="font-normal text-xs text-gray-700 ml-2">
                  {durationMinutes &&
                    dayjs
                      .duration(durationMinutes, "minutes")
                      .format("H[h] m[min]")}
                </p>
              </div>
            </div>
          </div>
          <div className="mx-6 my-2">
            <p className="font-bold mb-2 text-lg">Contact Information</p>
            <div className="flex items-center my-4">
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
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>

              <div>
                <p className="font-semibold text-sm text-gray-900 ml-2">
                  Customer Name
                </p>
                <p className="font-normal text-xs text-gray-900 ml-2">
                  {givenName} {familyName}
                </p>
              </div>
            </div>
            <div className="flex items-center my-4">
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
                  d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3"
                />
              </svg>

              <div>
                <p className="font-semibold text-sm text-gray-900 ml-2">
                  Email
                </p>
                <p className="font-normal text-xs text-gray-900 ml-2">
                  {emailAddress}
                </p>
              </div>
            </div>
            <div className="flex items-center my-4">
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
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>

              <div>
                <p className="font-semibold text-sm text-gray-900 ml-2">
                  Location
                </p>
                <p className="font-normal text-xs text-gray-900 ml-2">
                  {address?.addressLine1}
                </p>
                <p className="font-normal text-xs text-gray-900 ml-2">
                  {address?.locality}, {address?.administrativeDistrictLevel1},{" "}
                  {address?.postalCode}
                </p>
              </div>
            </div>
          </div>
          <div className="mx-6 my-2">
            <p className="font-bold mb-2 text-lg">
              Vehicle Type Selected
              {/* <span className="font-semibold text-md">{vehicleType}</span> */}
            </p>
            <Image
              src={`/vehicles/${vehicleType}.png`}
              alt=""
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center my-4">
        <p className="text-sm font-normal text-gray-900">
          If you have any questions, please contact us at{" "}
          <span className="text-blue-400 font-bold">
            paultevshinetime@gmail.com
          </span>
        </p>
      </div>
    </div>
  );
}
