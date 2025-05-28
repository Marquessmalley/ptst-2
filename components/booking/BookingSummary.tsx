import React from "react";
import Image from "next/image";
import { useBookingInfo } from "@/hooks/useBookingInfo";
import { Input, Divider, Textarea } from "@heroui/react";
import { currencyFormatter } from "@/lib/utils/currencyFormatter";
import { durationFormatter } from "@/lib/utils/durationFormatter";
import { formatTimeFromRFC3339 } from "@/lib/utils/formatRFC3339";

const BookingSummary = () => {
  const { bookingInfo } = useBookingInfo();
  const { selectedVehicle, selectedDate, selectedPackage, selectedTime } =
    bookingInfo;
  const { name, price, serviceDuration } = selectedPackage;

  return (
    <div className=" p-2 grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10">
      <div className=" p-2 col-span-7">
        <h2 className="my-3 font-bold text-lg text-default-700">
          Contact Information
        </h2>
        <Divider className="my-4" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-4 mb-10">
          <Input
            isRequired
            label="First Name"
            labelPlacement="outside"
            placeholder="Enter your first name"
            type="text"
            classNames={{
              label: "!text-default-700 text-sm font-medium",

              inputWrapper:
                "bg-default-200 data-[hover=true]:bg-default-300 min-h-9 h-9 group-data-[focus=true]:bg-default-200",
              input: "border-none focus:ring-0",
            }}
          />
          <Input
            isRequired
            label="Last Name"
            labelPlacement="outside"
            placeholder="Enter your last name"
            type="text"
            classNames={{
              label: "!text-default-700 text-sm font-medium",
              inputWrapper:
                "bg-default-200 data-[hover=true]:bg-default-300 min-h-9 h-9 group-data-[focus=true]:bg-default-200",
              input: "border-none focus:ring-0",
            }}
          />
        </div>

        <div className="mb-10">
          <Input
            isRequired
            errorMessage="Please enter a valid email"
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
            classNames={{
              label: "!text-default-700 text-sm font-medium",
              inputWrapper:
                "bg-default-200 data-[hover=true]:bg-default-300 min-h-9 h-9 group-data-[focus=true]:bg-default-200",
              input: "border-none focus:ring-0",
            }}
          />
        </div>
        <div className="mb-10">
          <Input
            isRequired
            errorMessage="Please enter a valid address"
            label="Address"
            labelPlacement="outside"
            name="address"
            placeholder="Enter your address"
            type="text"
            classNames={{
              label: "!text-default-700 text-sm font-medium",
              inputWrapper:
                "bg-default-200 data-[hover=true]:bg-default-300 min-h-9 h-9 group-data-[focus=true]:bg-default-200",
              input: "border-none focus:ring-0",
            }}
          />
        </div>
        <div className="w-full">
          <Textarea
            label="Additonal Comments"
            placeholder="Enter any additional comments"
            classNames={{
              label: "!text-default-700 text-sm font-medium",
              inputWrapper:
                "bg-default-200 data-[hover=true]:bg-default-300 min-h-9 h-9 group-data-[focus=true]:bg-default-200",
              input: "border-none focus:ring-0",
            }}
          />
        </div>
      </div>
      <div className="p-2 col-span-5">
        <h2 className="my-3 font-bold text-lg text-default-700 text-nowrap">
          Appointment Information
        </h2>
        <Divider className="my-4" />
        <div className="grid grid-cols-2 items-center mb-4">
          <p className="text-small text-default-500">Appointment Date</p>
          <p className="text-small text-default-800 font-semibold text-right">
            {new Date(selectedDate).toDateString()}
          </p>
        </div>
        <div className="grid grid-cols-2 items-center mb-4">
          <p className="text-small text-default-500">Appointment Time</p>
          <p className="text-small text-default-800 font-semibold text-right">
            {selectedTime}
          </p>
        </div>
        <div className="grid grid-cols-2 items-center mb-4 gap-x-4">
          <p className="text-small text-default-500">Vehicle Type</p>
          <div className="flex justify-end w-full ml-7">
            <Image
              src={`/vehicles/${selectedVehicle}.png`}
              alt=""
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 items-center mb-4 gap-x-4">
          <p className="text-small text-default-500">Service</p>
          <p className="text-small text-default-800 font-semibold text-right">
            {name}
          </p>
        </div>
        <div className="grid grid-cols-2 items-center mb-4 gap-x-4">
          <p className="text-small text-default-500">Estimated Time</p>
          <p className="text-small text-default-800 font-semibold text-right">
            {durationFormatter(serviceDuration)}
          </p>
        </div>
        <Divider className="my-4" />
        <div className="grid grid-cols-2 items-center mb-4 gap-x-4">
          <p className="text-small text-default-500">Estimated Price</p>
          <p className="text-small text-blue-500 font-semibold text-right">
            {currencyFormatter(price)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
