import { Suspense } from "react";
import BookingDetails from "@/components/booking/BookingDetails";
import BookingDetailsSkeleton from "@/components/ui/skeletons/BookingDetailsSkeleton";

export default async function ConfirmationDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="">
      <Suspense fallback={<BookingDetailsSkeleton />}>
        <BookingDetails id={id} />
      </Suspense>
    </div>
  );
}
