'use server';
import { client } from '@/lib/clients/sqaure';
import { notFound } from 'next/navigation';

export async function fetchBooking(id: string) {
  try {
    const bookingData = await client.bookings.get({ bookingId: id });
    return bookingData.booking;
  } catch (err: any) {
    console.error('Error fetching booking data:', err);
    if (err.statusCode === 404 || err?.body?.errors?.[0]?.code === 'NOT_FOUND')
      notFound();
  }
}

export async function fetchCustomer(id: string) {
  try {
    const customerData = await client.customers.get({ customerId: id });
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
  }
}
