import { client } from "@/lib/api/sqaure";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    // await client.bookings.create({
    //   booking: {
    //     locationId: process.env.LOCATION_ID,
    //   },
    // });
  } catch (err) {
    console.log(err);
  }
}
