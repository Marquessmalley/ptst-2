import React from 'react';
import {
  fetchCatalogRelatedObject,
  fetchCatalogObject,
} from '@/lib/data/booking';
import { replace } from '@/lib/utils/bigIntHandler';
import { formatTimeFromRFC3339 } from '@/lib/utils/formatRFC3339';
import { currencyFormatter } from '@/lib/utils/currencyFormatter';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const EmailTemplate = async ({
  customer,
  booking,
}: {
  customer: any;
  booking: any;
}) => {
  // CUSTOMER INFO
  console.log(customer);
  const { givenName, familyName, emailAddress } = customer;
  const { addressLine1, locality, administrativeDistrictLevel1, postalCode } =
    customer.address;

  const { appointment_segments, start_at } = booking;

  if (!appointment_segments)
    throw new Error('Appointment is missing in the booking data.');

  const { service_variation_id, duration_minutes } = appointment_segments[0];

  // CATALOG RELATED OBJECT INFO
  const catalogRelatedObject =
    service_variation_id &&
    (await fetchCatalogRelatedObject(service_variation_id));

  if (!catalogRelatedObject)
    throw new Error('Catalog related object is missing');

  const { relatedObjects } = catalogRelatedObject;

  const relatedObjectStringified =
    relatedObjects && JSON.stringify(relatedObjects[0], replace);

  const parsedRelatedObject =
    relatedObjectStringified && JSON.parse(relatedObjectStringified);

  const { name } = parsedRelatedObject.itemData;

  //  CATALOG OBJECT INFO
  const catalogObject = await fetchCatalogObject(service_variation_id);

  const catalogObjectStringified =
    catalogObject && JSON.stringify(catalogObject, replace);
  const parsedCatalogObject =
    catalogObjectStringified && JSON.parse(catalogObjectStringified);

  const catalogPrice = currencyFormatter(
    parsedCatalogObject.object.itemVariationData.priceMoney.amount,
  );

  console.log('catalogObject', parsedCatalogObject);

  return (
    <div className="bg-white p-2">
      <div className="mx-10">
        <h1 className="my-2 whitespace-nowrap text-center text-sm font-bold text-gray-700 sm:text-3xl">
          Thank you, {givenName}
        </h1>
        <p className="text-center text-xs font-semibold text-gray-700 sm:text-base">
          We're excited to make your vehicle shine with our detailing services.
          Here are your boooking details:
        </p>
      </div>

      <div className="mx-10 my-10 rounded-xl bg-gradient-to-br from-sky-300/20 via-slate-50 to-orange-300/20 pt-10">
        <div className="mx-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mb-2 mr-2 size-5 text-sky-400 sm:size-8"
          >
            <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
            <path
              fillRule="evenodd"
              d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
              clipRule="evenodd"
            />
          </svg>

          <h2 className="mb-2 whitespace-nowrap text-sm font-bold text-gray-700 sm:text-2xl">
            Booking Summary
          </h2>
        </div>

        <div className="mx-6 grid grid-cols-1 sm:grid-cols-2">
          <div>
            <div className="my-4">
              <p className="text-xl font-normal text-gray-500">
                Selected Package
              </p>
              <p className="text-lg font-bold text-gray-900">{name}</p>
            </div>
            <div className="my-4">
              <p className="text-xl font-normal text-gray-500">Date & Time</p>
              <p className="text-lg font-bold text-gray-900">
                {start_at && new Date(start_at).toDateString()}
              </p>
              <p className="text-lg font-bold text-sky-400">
                {' '}
                {start_at && formatTimeFromRFC3339(start_at)}
              </p>
            </div>
            <div className="my-4">
              <p className="text-xl font-normal text-gray-500">Vehicle Type</p>
              <p className="text-lg font-bold text-gray-900">
                {' '}
                {parsedCatalogObject.object.itemVariationData.name}
              </p>
            </div>
            <div className="my-4">
              <p className="text-xl font-normal text-gray-500">
                Estimated Duration
              </p>

              <p className="text-lg font-bold text-gray-900">
                {duration_minutes &&
                  dayjs
                    .duration(duration_minutes, 'minutes')
                    .format('H[h] m[min]')}
              </p>
            </div>
          </div>
          <div>
            <div className="my-4">
              <p className="text-xl font-normal text-gray-500">Location</p>

              <p className="text-lg font-bold text-gray-900">{addressLine1}</p>
              <p className="text-lg font-bold text-gray-900">
                {locality}, {administrativeDistrictLevel1}, {postalCode}
              </p>
            </div>
            <div className="my-4">
              <p className="text-xl font-normal text-gray-500">
                Contact Information
                <p className="text-lg font-bold text-gray-900">
                  {givenName} {familyName}
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {' '}
                  {emailAddress}
                </p>
              </p>
            </div>

            <div className="my-4 rounded-xl border bg-white ring-1">
              <p className="my-2 ml-2 text-2xl font-normal text-gray-500">
                Total Amount
              </p>
              <p className="my-2 ml-2 text-3xl font-bold text-sky-400">
                {catalogPrice}
              </p>
              <p className="my-2 ml-2 text-lg font-semibold text-gray-500">
                Payment due on service date
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplate;
