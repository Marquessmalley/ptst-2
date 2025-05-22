import { client } from "@/lib/sqaure";

// Converts BigInt data type to a string.
function replacer(key: string, value: any) {
  return typeof value === "bigint" ? value.toString() : value;
}

export async function POST(request: Request) {
  try {
    const { selectedVehicle } = await request.json(); // <- Parse the JSON from the readable stream
    const serviceList = await client.catalog.list({ types: "ITEM" });
    const { data } = serviceList;

    // Manually stringify with custom replacer to handle BigInt, replacer will run for every key/value
    const json = JSON.stringify({ data }, replacer);

    return new Response(json);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "There was a error fetching the services." });
  }
}
