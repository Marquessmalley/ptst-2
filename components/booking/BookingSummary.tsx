'use client';
import React from 'react';
import Image from 'next/image';
import { AddressAutofill } from '@mapbox/search-js-react';
import { useBookingInfo } from '@/hooks/useBookingInfo';
import { Input, Divider, Textarea } from '@heroui/react';
import { currencyFormatter } from '@/lib/utils/currencyFormatter';
import { durationFormatter } from '@/lib/utils/durationFormatter';
import { BookingInfo } from '@/lib/definitions/definitions';

const BookingSummary = () => {
  const { bookingInfo, setBookingInfo } = useBookingInfo();
  const { selectedVehicle, selectedDate, selectedPackage, selectedTime } =
    bookingInfo;
  const { name, price, serviceDuration } = selectedPackage;

  const handleUserForm = (e: any) => {
    setBookingInfo((prevState: BookingInfo) => ({
      ...prevState,
      userInfo: {
        ...prevState.userInfo,
        [e.target.name]: e.target.value,
      },
    }));
  };

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
            name="firstName"
            label="First Name"
            labelPlacement="outside"
            placeholder="Enter your first name"
            type="text"
            onChange={handleUserForm}
            classNames={{
              label: '!text-default-700 text-sm font-medium',

              inputWrapper:
                'bg-default-200 data-[hover=true]:bg-default-300 min-h-9 h-9 group-data-[focus=true]:bg-default-200',
              input: 'border-none focus:ring-0',
            }}
          />
          <Input
            isRequired
            name="lastName"
            label="Last Name"
            labelPlacement="outside"
            placeholder="Enter your last name"
            type="text"
            onChange={handleUserForm}
            classNames={{
              label: '!text-default-700 text-sm font-medium',
              inputWrapper:
                'bg-default-200 data-[hover=true]:bg-default-300 min-h-9 h-9 group-data-[focus=true]:bg-default-200',
              input: 'border-none focus:ring-0',
            }}
          />
        </div>

        <div className="mb-10">
          <Input
            isRequired
            name="email"
            errorMessage="Please enter a valid email"
            label="Email"
            labelPlacement="outside"
            placeholder="Enter your email"
            type="email"
            onChange={handleUserForm}
            classNames={{
              label: '!text-default-700 text-sm font-medium',
              inputWrapper:
                'bg-default-200 data-[hover=true]:bg-default-300 min-h-9 h-9 group-data-[focus=true]:bg-default-200',
              input: 'border-none focus:ring-0',
            }}
          />
        </div>
        <div className="mb-10">
          <AddressAutofill
            accessToken={`${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
          >
            <Input
              isRequired
              name="address"
              errorMessage="Please enter a valid address"
              label="Address"
              labelPlacement="outside"
              placeholder="Enter your address"
              autoComplete="address-line1"
              type="text"
              onChange={handleUserForm}
              classNames={{
                label: '!text-default-700 text-sm font-medium',
                inputWrapper:
                  'bg-default-200 data-[hover=true]:bg-default-300 min-h-9 h-9 group-data-[focus=true]:bg-default-200',
                input: 'border-none focus:ring-0',
              }}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-4 mt-4">
              <Input
                isRequired
                name="city"
                label="City"
                labelPlacement="outside"
                placeholder="City"
                autoComplete="address-level2"
                type="text"
                onChange={handleUserForm}
                classNames={{
                  label: '!text-default-700 text-sm font-medium',

                  inputWrapper:
                    'bg-default-200 data-[hover=true]:bg-default-300 min-h-9 h-9 group-data-[focus=true]:bg-default-200',
                  input: 'border-none focus:ring-0',
                }}
              />
              <Input
                isRequired
                name="state"
                label="State"
                labelPlacement="outside"
                placeholder="State"
                autoComplete="address-level1"
                type="text"
                onChange={handleUserForm}
                classNames={{
                  label: '!text-default-700 text-sm font-medium',
                  inputWrapper:
                    'bg-default-200 data-[hover=true]:bg-default-300 min-h-9 h-9 group-data-[focus=true]:bg-default-200',
                  input: 'border-none focus:ring-0',
                }}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-4 mt-4">
              <Input
                isRequired
                name="postalCode"
                label="Postal Code"
                labelPlacement="outside"
                placeholder="Postal Code"
                autoComplete="postal-code"
                type="text"
                onChange={handleUserForm}
                classNames={{
                  label: '!text-default-700 text-sm font-medium',

                  inputWrapper:
                    'bg-default-200 data-[hover=true]:bg-default-300 min-h-9 h-9 group-data-[focus=true]:bg-default-200',
                  input: 'border-none focus:ring-0',
                }}
              />
              <Input
                isRequired
                name="country"
                label="Country"
                labelPlacement="outside"
                placeholder="Country"
                autoComplete="country"
                type="text"
                onChange={handleUserForm}
                classNames={{
                  label: '!text-default-700 text-sm font-medium',
                  inputWrapper:
                    'bg-default-200 data-[hover=true]:bg-default-300 min-h-9 h-9 group-data-[focus=true]:bg-default-200',
                  input: 'border-none focus:ring-0',
                }}
              />
            </div>
          </AddressAutofill>
        </div>
        <div className="w-full">
          <Textarea
            name="additionalComments"
            label="Additonal Comments"
            placeholder="Enter any additional comments"
            onChange={handleUserForm}
            classNames={{
              label: '!text-default-700 text-sm font-medium',
              inputWrapper:
                'bg-default-200 data-[hover=true]:bg-default-300 min-h-9 h-9 group-data-[focus=true]:bg-default-200',
              input: 'border-none focus:ring-0',
            }}
          />
        </div>
      </div>
      <div className="p-2 col-span-5">
        <h2 className="my-3 font-bold text-lg text-default-700 text-nowrap">
          Appointment Information
        </h2>
        <Divider className="my-4" />
        <div className="grid grid-cols-2 items-center mb-8">
          <p className="text-small text-default-500">Appointment Date</p>
          <p className="text-small text-default-800 font-semibold text-right">
            {new Date(selectedDate).toDateString()}
          </p>
        </div>
        <div className="grid grid-cols-2 items-center mb-8">
          <p className="text-small text-default-500">Appointment Time</p>
          <p className="text-small text-default-800 font-semibold text-right">
            {selectedTime}
          </p>
        </div>
        <div className="grid grid-cols-2 items-center mb-8 gap-x-4">
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
        <div className="grid grid-cols-2 items-center mb-8 gap-x-4">
          <p className="text-small text-default-500">Service</p>
          <p className="text-small text-default-800 font-semibold text-right">
            {name}
          </p>
        </div>
        <div className="grid grid-cols-2 items-center mb-8 gap-x-4">
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
