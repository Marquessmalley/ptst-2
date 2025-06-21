import { client } from "@/lib/api/sqaure";
import { replace } from "@/lib/utils/bigIntHandler";
import removeExistingTimeSlot from "@/lib/utils/removeExistingTimeSlot";

export async function POST(request: Request) {
  const body = await request.json();
  const { selectedDate } = body;
  const { teamMmebers, variationId, serviceDuration } = body.selectedPackage;
  const endAt = selectedDate.split("T")[0];

  try {
    const memberAvailabilites = await client.bookings.searchAvailability({
      query: {
        filter: {
          locationId: process.env.LOCATION_ID,
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
      locationId: process.env.LOCATION_ID,
    });

    const openSlots = removeExistingTimeSlot(
      existingBookings,
      memberAvailabilites,
      serviceDuration
    );

    console.log(openSlots);

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
