import { resend } from "@/lib/api/resend";
import { WebhooksHelper } from "square";
import EmailTemplate from "@/components/booking/EmailTemplate";
// Adding ! is a non null assertion
const signature_key = process.env.SQUARE_SIGNATURE_KEY!;
const notification_url = process.env.SQUARE_NOTIFICATION_URL!;

export async function POST(request: Request) {
  // Need to verify/validate the sqaure event notification
  // Generate a signature from the notification url, signature key,
  // and request body and compare it to the Square signature header.

  try {
    const sqaure_signature = request.headers.get(
      "x-square-hmacsha256-signature"
    );

    const body = await request.json();
    const rawBody = await request.text();

    if (!sqaure_signature) {
      return new Response("Unathorized", { status: 401 });
    }

    // Generates a signature and compare it to the one sent from square
    const isSignatureValid = await WebhooksHelper.verifySignature({
      requestBody: rawBody,
      signatureHeader: sqaure_signature,
      signatureKey: signature_key,
      notificationUrl: notification_url,
    });

    if (!isSignatureValid) {
      return new Response("Unauthorized", { status: 401 });
    } else {
      console.log("Body: ", body);
      console.log("Raw Body: ", rawBody);
    }

    // if (body?.type === "booking.created") {
    //   const booking = body.data?.object?.booking;
    //   const email = booking?.customer_details?.email_address;

    //   console.log("📅 Booking received:", booking);

    //   const { data, error } = await resend.emails.send({
    //     from: "marquessmalley@gmail.com",
    //     to: ["ksmalley77@gmail.com"],
    //     subject: "Paul & Tev Shine Time Confirmation",
    //     react: EmailTemplate(),
    //   });

    //   if (error) {
    //     return Response.json({ error }, { status: 500 });
    //   }

    // return Response.json(data);
  } catch (err) {
    console.log(err);
  }
}
