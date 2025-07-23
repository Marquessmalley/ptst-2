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
          // margin: 'auto',
          // width: '50%',
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
          <img
            src="/blue-calendar.png"
            alt="blue-calendar"
            height={28}
            width={28}
            style={{ marginRight: '8px' }}
          />
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
                  margin: '1px',
                }}
              >
                Total Amount
              </p>
              <p
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#38bdf8',
                  margin: '1px',
                }}
              >
                {catalogPrice}
              </p>
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#6b7280',
                  margin: '1px',
                }}
              >
                Payment due on service date
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <table
          style={{
            margin: '16px auto',
          }}
          width={'50%'}
        >
          <tbody>
            <tr>
              <td>
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
                  <img
                    src="/white-calendar.png"
                    alt="white-calendar"
                    height={24}
                    width={24}
                    style={{ marginRight: '8px' }}
                  />
                  Add to Calendar
                </button>
              </td>

              <td>
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
                  <img
                    src="/blue-phone.png"
                    alt="blue-phone"
                    height={24}
                    width={24}
                    style={{ marginRight: '8px' }}
                  />
                  Contact Support
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmailTemplate;
