import { client } from "@/lib/api/sqaure";
import { replace } from "@/lib/utils/bigIntHandler";

export async function POST(request: Request) {
  const body = await request.json();

  const { selectedDate } = body;
  const { firstName, lastName, email, address, additionalComments } =
    body.userInfo;
  const { variationId, variationVersion, teamMembers } = body.selectedPackage;

  try {
    // Create customer first
    const customer = await client.customers.create({
      givenName: firstName,
      familyName: lastName,
      emailAddress: email,
    });

    // create booking
    const booking = await client.bookings.create({
      booking: {
        appointmentSegments: [
          {
            teamMemberId: teamMembers[1],
            serviceVariationId: variationId,
            serviceVariationVersion: BigInt(variationVersion),
          },
        ],
        locationId: process.env.LOCATION_ID,
        locationType: "BUSINESS_LOCATION",
        customerId: customer.customer?.id,
        startAt: `${selectedDate}Z`,
      },
    });

    const json = JSON.stringify({ booking }, replace);
    return new Response(json, {
      headers: { "Content-type": "application/json" },
    });
  } catch (err) {
    console.log("The error: ", err);
  }
}
