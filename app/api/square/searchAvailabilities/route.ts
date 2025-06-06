import { client } from "@/lib/api/sqaure";
import { replace } from "@/lib/utils/bigIntHandler";
import { headers } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const { selectedDate } = body;
  const { teamMmebers, variationId } = body.selectedPackage;
  const endAt = selectedDate.split("T")[0];

  try {
    const availabilites = await client.bookings.searchAvailability({
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
    const newAva = JSON.stringify(availabilites, replace);

    return new Response(newAva, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      error: "There was a error fetching the availabilites.",
    });
  }
}
