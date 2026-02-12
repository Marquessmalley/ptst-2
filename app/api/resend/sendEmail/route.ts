import { resend } from '@/lib/clients/resend';
import { client } from '@/lib/clients/sqaure';
import { WebhooksHelper } from 'square';
import EmailTemplate from '@/components/booking/EmailTemplate';

const signature_key = process.env.SQUARE_SIGNATURE_KEY!;
const notification_url = process.env.SQUARE_NOTIFICATION_URL!;

export async function POST(request: Request) {
  try {
    const square_signature = request.headers.get(
      'x-square-hmacsha256-signature',
    );

    const rawBody = await request.text();

    if (!square_signature) {
      return new Response('Unauthorized', { status: 401 });
    }

    const isSignatureValid = await WebhooksHelper.verifySignature({
      requestBody: rawBody,
      signatureHeader: square_signature,
      signatureKey: signature_key,
      notificationUrl: notification_url,
    });

    if (!isSignatureValid) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = JSON.parse(rawBody);

    if (body?.type === 'booking.created') {
      const customer_id = body.data?.object?.booking?.customer_id;

      const customer = await client.customers.get({ customerId: customer_id });
      const booking = body.data.object.booking;

      const { data, error } = await resend.emails.send({
        from: 'noreply@send.ptshinetime.com',
        to: [`${customer.customer?.emailAddress}`],
        subject: 'Paul & Tev Shine Time Appointment Confirmation',
        react: EmailTemplate({ customer: customer.customer, booking }),
      });

      if (error) {
        console.log(error);
        return Response.json({ error }, { status: 500 });
      }

      return Response.json(data);
    }

    return new Response('Event not handled', { status: 200 });
  } catch (err) {
    console.error('Webhook error:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}
