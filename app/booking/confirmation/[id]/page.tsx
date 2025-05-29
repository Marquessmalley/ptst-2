import { Suspense } from "react";
import BookingDetails from "@/components/booking/BookingDetails";

export default async function ConfirmationDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h3>Welcome to the Confirmation page</h3>
      <Suspense fallback={<p>Loading...</p>}>
        <BookingDetails id={id} />
      </Suspense>
    </div>
  );
}
