import { client } from "@/lib/api/sqaure";
import { replace } from "@/lib/utils/bigIntHandler";
import { headers } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const { teamMmebers, variationId } = body.selectedPackage;

  console.log(body);

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
            startAt: "2025-05-28T13:28:04.882Z",
            endAt: "2025-05-28T18:28:09.456Z",
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
