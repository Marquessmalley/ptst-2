import { resend } from "@/lib/api/resend";
import EmailTemplate from "@/components/booking/EmailTemplate";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    if (body?.type === "booking.created") {
      const booking = body.data?.object?.booking;
      const email = booking?.customer_details?.email_address;

      console.log("📅 Booking received:", booking);

      const { data, error } = await resend.emails.send({
        from: "marquessmalley@gmail.com",
        to: ["ksmalley77@gmail.com"],
        subject: "Paul & Tev Shine Time Confirmation",
        react: EmailTemplate(),
      });

      if (error) {
        return Response.json({ error }, { status: 500 });
      }

      return Response.json(data);
    }
  } catch (err) {
    console.log(err);
  }
}
