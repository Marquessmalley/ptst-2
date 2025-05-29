import { client } from "@/lib/api/sqaure";

export default async function BookingDetails({ id }: { id: string }) {
  const bookingData = await client.bookings.get({ bookingId: id });

  const customerId = bookingData.booking?.customerId;

  if (!customerId) {
    throw new Error("Customer ID is missing in the booking data.");
  }

  const customerData = await client.customers.get({ customerId });

  return (
    <div>
      <p>Booking id: {id}</p>
    </div>
  );
}
