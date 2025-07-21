import { Divider } from '@heroui/react';
import Image from 'next/image';
import { replace } from '@/lib/utils/bigIntHandler';
import { formatTimeFromRFC3339 } from '@/lib/utils/formatRFC3339';
import { currencyFormatter } from '@/lib/utils/currencyFormatter';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {
  fetchBooking,
  fetchCatalogObject,
  fetchCatalogRelatedObject,
} from '@/lib/data/booking';
import BookingConfirmationHeader from './confirmation/BookingConfirmationHeader';
import CustomerInfo from './confirmation/CustomerInfo';
import EmailTemplate from './EmailTemplate';
dayjs.extend(duration);

export default async function BookingDetails({ id }: { id: string }) {
  // BOOKING INFO
  const bookingData = await fetchBooking(id);

  if (!bookingData) {
    throw new Error('Booking data is missing');
  }

  const { status, customerId, startAt, appointmentSegments } = bookingData;

  if (!appointmentSegments)
    throw new Error('Appointment is missing in the booking data.');

  const { serviceVariationId, durationMinutes } = appointmentSegments[0];

  // CATALOG RELATED OBJECT INFO
  const catalogRelatedObject =
    serviceVariationId && (await fetchCatalogRelatedObject(serviceVariationId));

  if (!catalogRelatedObject)
    throw new Error('Catalog related object is missing');

  const { relatedObjects } = catalogRelatedObject;

  const relatedObjectStringified =
    relatedObjects && JSON.stringify(relatedObjects[0], replace);

  const parsedRelatedObject =
    relatedObjectStringified && JSON.parse(relatedObjectStringified);

  const { name } = parsedRelatedObject.itemData;

  // CATALOG OBJECT INFO
  const catalogObject = await fetchCatalogObject(serviceVariationId);

  const catalogObjectStringified =
    catalogObject && JSON.stringify(catalogObject, replace);
  const parsedCatalogObject =
    catalogObjectStringified && JSON.parse(catalogObjectStringified);

  const catalogPrice = currencyFormatter(
    parsedCatalogObject.object.itemVariationData.priceMoney.amount,
  );

  const vehicleType = parsedCatalogObject.object.itemVariationData.name;

  return (
    <div>
      {/* Top */}
      <BookingConfirmationHeader id={id} />

      {/* MIDDLE */}
      <div className="mx-auto max-w-4xl rounded-xl bg-white/10 backdrop-blur-lg sm:border sm:shadow-lg">
        <div className="grid grid-cols-2">
          <div className="col-span-1 mx-6 my-4">
            <h3 className="whitespace-nowrap text-sm font-bold text-gray-700 sm:text-xl">
              Booking Summary
            </h3>
            <p className="whitespace-nowrap text-xs font-normal text-gray-700 sm:text-base">
              Booking ID: #{id}{' '}
            </p>
          </div>

          <p className="mx-2 my-4 flex h-6 w-20 items-center justify-center justify-self-end rounded-3xl bg-green-200 text-center text-xs font-semibold text-green-500 sm:mx-6 sm:my-4 sm:h-7 sm:w-24">
            {status &&
              status
                .charAt(0)
                .toUpperCase()
                .concat(status.slice(1).toLocaleLowerCase())}
          </p>
        </div>

        <Divider className="my-4" />
        <div className="mx-6 my-4 flex flex-col gap-y-4 sm:flex-row sm:justify-between">
          <div className="flex items-center justify-between sm:flex-col">
            <p className="text-sm font-semibold text-gray-600">Total Amount:</p>
            <p className="text-lg font-bold sm:text-2xl">{catalogPrice}</p>
          </div>
          <div
            className="flex max-w-xs items-center border-l-4 border-orange-500 bg-orange-100 text-orange-700 sm:p-1"
            role="alert"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.75"
              stroke="currentColor"
              className="size-14 sm:size-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>

            <p className="ml-2 text-xs font-normal">
              Please remove all personal belongings from your vehicle before
              your appointment
            </p>
          </div>
        </div>
        <Divider className="my-4" />

        <div className="grid grid-cols-1 sm:grid-cols-3">
          <div className="mx-6 my-2">
            <p className="mb-2 text-lg font-bold">Service Details</p>
            <div className="my-4 flex items-center">
              <Image
                src="/wash.png"
                alt=""
                width={28}
                height={28}
                className="rounded-full bg-sky-400 p-1"
              />
              <div>
                <p className="ml-2 text-sm font-semibold text-gray-900">
                  Package Selected
                </p>
                <p className="ml-2 text-xs font-normal text-gray-900">{name}</p>
              </div>
            </div>
            <div className="my-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-7 rounded-full bg-sky-400 p-1 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <div>
                <p className="ml-2 text-sm font-semibold text-gray-900">
                  {startAt && new Date(startAt).toDateString()}
                </p>
                <p className="ml-2 text-xs font-normal text-gray-700">
                  {startAt && formatTimeFromRFC3339(startAt)}
                </p>
              </div>
            </div>
            <div className="my-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-7 rounded-full bg-sky-400 p-1 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <div>
                <p className="ml-2 text-sm font-semibold text-gray-900">
                  Estimated Duration
                </p>
                <p className="ml-2 text-xs font-normal text-gray-700">
                  {durationMinutes &&
                    dayjs
                      .duration(durationMinutes, 'minutes')
                      .format('H[h] m[min]')}
                </p>
              </div>
            </div>
          </div>
          {customerId && <CustomerInfo customerId={customerId} />}

          <div className="mx-6 my-2">
            <p className="mb-2 text-lg font-bold">
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
      <div className="my-4 flex justify-center">
        <p className="text-center text-xs font-normal text-gray-900 sm:text-sm">
          If you have any questions, please contact us at{' '}
          <span className="font-bold text-sky-400">
            paultevshinetime@gmail.com
          </span>
        </p>
      </div>
      <EmailTemplate
        customer={{
          id: 'P8PPS3GNJ3S2MSTXFBQ0P8PYZR',
          createdAt: '2025-07-21T16:19:28.869Z',
          updatedAt: '2025-07-21T16:19:28Z',
          givenName: 'Marques',
          familyName: 'Smalley',
          emailAddress: 'marquessmalley@gmail.com',
          address: {
            addressLine1: '1130 Watkins St Se',
            locality: 'Grand Rapids',
            administrativeDistrictLevel1: 'MI',
            postalCode: '49507-1471',
            country: 'US',
          },
          preferences: { emailUnsubscribed: false },
          creationSource: 'THIRD_PARTY',
          version: 'sd',
        }}
        booking={{
          all_day: false,
          appointment_segments: [
            {
              any_team_member: false,
              duration_minutes: 60,
              intermission_minutes: 0,
              service_variation_client_id: 'NLWJSXNIBO3QUHDDG2E6KVKY',
              service_variation_id: 'NLWJSXNIBO3QUHDDG2E6KVKY',
              service_variation_version: 1751398491025,
              team_member_id: 'TMtLnHz_8nF077sH',
            },
          ],
          created_at: '2025-07-21T16:19:29Z',
          creator_details: {
            creator_type: 'TEAM_MEMBER',
            team_member_id: 'TM2QOzwJy1ncnlMv',
          },
          customer_id: 'P8PPS3GNJ3S2MSTXFBQ0P8PYZR',
          id: 'stgq7lmny7szmv',
          location_id: 'LPXCQMSNKV7E6',
          location_type: 'BUSINESS_LOCATION',
          source: 'API',
          start_at: '2025-07-26T16:00:00Z',
          status: 'ACCEPTED',
          transition_time_minutes: 0,
          updated_at: '2025-07-21T16:19:29Z',
          version: 0,
        }}
      />
    </div>
  );
}
