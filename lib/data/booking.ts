import { client } from '@/lib/api/sqaure';
import { notFound } from 'next/navigation';

export async function fetchBooking(id: string) {
  try {
    const bookingData = await client.bookings.get({ bookingId: id });

    if (!bookingData.booking) notFound();

    return bookingData.booking;
  } catch (err) {
    console.error('Error fetching booking data:', err);
    throw new Error('Booking is missing in the booking data.');
  }
}

export async function fetchCustomer(id: string) {
  try {
    const customerData = await client.customers.get({ customerId: id });

    if (!customerData.customer) notFound();

    return customerData.customer;
  } catch (err) {
    console.error('Error fetching customer data:', err);
    throw new Error('Customer is missing in the booking data.');
  }
}

export async function fetchCatalogObject(serviceVariationId: string) {
  try {
    const catalogObject = await client.catalog.object.get({
      objectId: serviceVariationId,
    });

    return catalogObject;
  } catch (err) {
    console.error('Error fetching catalog data:', err);
    throw new Error('Catalog data is missing');
  }
}

export async function fetchCatalogRelatedObject(serviceVariationId: string) {
  try {
    const catalogRelatedObject = await client.catalog.object.get({
      objectId: serviceVariationId,
      includeRelatedObjects: true,
    });

    return catalogRelatedObject;
  } catch (err) {
    console.error('Error fetching service data:', err);
    throw new Error('Service variation id is missing');
  }
}
