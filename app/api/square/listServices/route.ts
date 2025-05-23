import { client } from "@/lib/api/sqaure";

// Converts BigInt data type to a string.
function replacer(key: string, value: any) {
  return typeof value === "bigint" ? value.toString() : value;
}

export async function GET(request: Request) {
  try {
    const serviceList = await client.catalog.list({ types: "ITEM" });
    const { data } = serviceList;

    // Manually stringify with custom replacer to handle BigInt, replacer will run for every key/value
    const json = JSON.stringify({ data }, replacer);

    return new Response(json, {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "There was a error fetching the services." });
  }
}
