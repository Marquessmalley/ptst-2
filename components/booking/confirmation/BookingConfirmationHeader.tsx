import { fetchBooking } from '@/lib/data/booking';

export default async function BookingConfirmationHeader({
  id,
}: {
  id: string;
}) {
  const bookingData = await fetchBooking(id);
  const { status, customerId, startAt, appointmentSegments } = bookingData;
  return (
    <div className="mb-10 grid grid-cols-1 place-items-center">
      <div className="my-2 flex items-center">
        <h2 className="text-xl font-bold text-gray-700 sm:text-4xl">
          Appointment{' '}
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
          className="ml-2 size-8 rounded-full border bg-white p-1 sm:size-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </div>
      <p className="text-center text-xs font-semibold text-gray-700 sm:text-sm">
        Thank you for choosing our car detailing service.
      </p>
    </div>
  );
}
