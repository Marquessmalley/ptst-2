import { client } from "@/lib/api/sqaure";
import { replace } from "@/lib/utils/bigIntHandler";
import removeUnavailableSlot from "@/lib/utils/removeUnavailableSlot";

export async function POST(request: Request) {
  const body = await request.json();
  const { selectedDate } = body;
  const { teamMmebers, variationId, serviceDuration } = body.selectedPackage;
  const endAt = selectedDate.split("T")[0];

  try {
    const memberAvailabilites = await client.bookings.searchAvailability({
      query: {
        filter: {
          locationId: process.env.SQUARE_LOCATION_ID,
          segmentFilters: [
            {
              serviceVariationId: variationId,
              teamMemberIdFilter: {
                any: teamMmebers,
              },
            },
          ],
          startAtRange: {
            startAt: `${selectedDate}`,
            endAt: `${endAt}T24:00:00.000Z`,
          },
        },
      },
    });

    const existingBookings = await client.bookings.list({
      locationId: process.env.SQUARE_LOCATION_ID,
    });

    const openSlots = removeUnavailableSlot(
      existingBookings,
      memberAvailabilites,
      serviceDuration
    );

    const availabilites = JSON.stringify(openSlots, replace);

    return new Response(availabilites, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      error: "There was a error fetching the availabilites.",
    });
  }
}
