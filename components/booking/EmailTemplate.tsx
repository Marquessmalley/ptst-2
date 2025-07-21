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
    <div style={{ backgroundColor: '#ffffff', padding: '8px' }}>
      <div style={{ marginLeft: '40px', marginRight: '40px' }}>
        <h1
          style={{
            marginTop: '8px',
            marginBottom: '8px',
            whiteSpace: 'nowrap',
            textAlign: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#374151',
          }}
        >
          Thank you, {givenName}
        </h1>
        <p
          style={{
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: '600',
            color: '#374151',
          }}
        >
          We&apos;re excited to make your vehicle shine with our detailing
          services. Here are your booking details:
        </p>
      </div>

      <div
        style={{
          marginLeft: '40px',
          marginRight: '40px',
          marginTop: '40px',
          marginBottom: '40px',
          borderRadius: '16px',
          background:
            'linear-gradient(to bottom right, rgba(125, 211, 252, 0.2), #f8fafc, rgba(253, 186, 116, 0.2))',
          paddingTop: '40px',
        }}
      >
        <div
          style={{
            marginLeft: '16px',
            marginRight: '16px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            view-box="0 0 24 24"
            fill="currentColor"
            style={{
              marginBottom: '8px',
              marginRight: '8px',
              width: '32px',
              height: '32px',
              color: '#38bdf8',
            }}
          >
            <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
            <path
              fill-rule="evenodd"
              d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
              clip-rule="evenodd"
            />
          </svg>
          <h2
            style={{
              marginBottom: '8px',
              whiteSpace: 'nowrap',
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#374151',
            }}
          >
            Booking Summary
          </h2>
        </div>

        <div
          style={{
            marginLeft: '24px',
            marginRight: '24px',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: '1 1 50%', minWidth: '300px' }}>
            <div style={{ marginBottom: '16px' }}>
              <p
                style={{
                  fontSize: '18px',
                  fontWeight: 'normal',
                  color: '#6b7280',
                }}
              >
                Selected Package
              </p>
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#111827',
                }}
              >
                {name}
              </p>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <p
                style={{
                  fontSize: '18px',
                  fontWeight: 'normal',
                  color: '#6b7280',
                }}
              >
                Date & Time
              </p>
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#111827',
                }}
              >
                {start_at && new Date(start_at).toDateString()}
              </p>
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#38bdf8',
                }}
              >
                {start_at && formatTimeFromRFC3339(start_at)}
              </p>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <p
                style={{
                  fontSize: '18px',
                  fontWeight: 'normal',
                  color: '#6b7280',
                }}
              >
                Vehicle Type
              </p>
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#111827',
                }}
              >
                {parsedCatalogObject.object.itemVariationData.name}
              </p>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <p
                style={{
                  fontSize: '18px',
                  fontWeight: 'normal',
                  color: '#6b7280',
                }}
              >
                Estimated Duration
              </p>
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#111827',
                }}
              >
                {duration_minutes &&
                  dayjs
                    .duration(duration_minutes, 'minutes')
                    .format('H[h] m[min]')}
              </p>
            </div>
          </div>

          <div style={{ flex: '1 1 50%', minWidth: '300px' }}>
            <div style={{ marginBottom: '16px' }}>
              <p
                style={{
                  fontSize: '18px',
                  fontWeight: 'normal',
                  color: '#6b7280',
                }}
              >
                Location
              </p>
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#111827',
                }}
              >
                {addressLine1}
              </p>
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#111827',
                }}
              >
                {locality}, {administrativeDistrictLevel1}, {postalCode}
              </p>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <p
                style={{
                  fontSize: '18px',
                  fontWeight: 'normal',
                  color: '#6b7280',
                }}
              >
                Contact Information
              </p>
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#111827',
                }}
              >
                {givenName} {familyName}
              </p>
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#111827',
                }}
              >
                {emailAddress}
              </p>
            </div>
            <div
              style={{
                borderRadius: '16px',
                border: '1px solid #e5e7eb',
                backgroundColor: '#ffffff',
                marginBottom: '16px',
                padding: '16px',
              }}
            >
              <p
                style={{
                  fontSize: '20px',
                  fontWeight: 'normal',
                  color: '#6b7280',
                }}
              >
                Total Amount
              </p>
              <p
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#38bdf8',
                }}
              >
                {catalogPrice}
              </p>
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#6b7280',
                }}
              >
                Payment due on service date
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* <div className="my-4 flex justify-center gap-6">
          <button className="flex items-center rounded-2xl bg-gradient-to-r from-sky-400 to-orange-400 p-2 text-lg font-bold text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{
                marginBottom: '8px',
                marginRight: '8px',
                width: '32px',
                height: '32px',
                color: 'white',
              }}
            >
              <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
              <path
                fillRule="evenodd"
                d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                clipRule="evenodd"
              />
            </svg>
            Add to Calendar
          </button>
          <button className="flex items-center rounded-2xl border-2 border-sky-400 p-2 text-lg font-bold text-sky-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-xky-400 mr-1 size-6"
            >
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                clipRule="evenodd"
              />
            </svg>
            Contact Support
          </button>
        </div> */}

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            margin: '16px 0',
          }}
        >
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: '16px',
              background: 'linear-gradient(to right, #38bdf8, #fdba74)',
              padding: '8px',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#ffffff',
              border: 'none',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              view-box="0 0 24 24"
              fill="currentColor"
              style={{
                marginBottom: '8px',
                marginRight: '8px',
                width: '32px',
                height: '32px',
                color: 'white',
              }}
            >
              <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
              <path
                fill-rule="evenodd"
                d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                clip-rule="evenodd"
              />
            </svg>
            Add to Calendar
          </button>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: '16px',
              border: '2px solid #38bdf8',
              padding: '8px',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#38bdf8',
              backgroundColor: 'white',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              view-box="0 0 24 24"
              fill="currentColor"
              style={{
                marginRight: '8px',
                width: '24px',
                height: '24px',
                color: '#38bdf8',
              }}
            >
              <path
                fill-rule="evenodd"
                d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                clip-rule="evenodd"
              />
            </svg>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplate;
