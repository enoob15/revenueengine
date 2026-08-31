import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    return null;
  }

  return new Stripe(secretKey);
}

export async function POST(request: NextRequest) {
  const stripe = getStripeClient();
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !signature || !webhookSecret) {
    return NextResponse.json(
      {
        received: false,
        error: "Stripe webhook configuration is incomplete."
      },
      { status: 400 }
    );
  }

  const payload = await request.text();

  try {
    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);

    return NextResponse.json({
      received: true,
      type: event.type
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid webhook payload.";

    return NextResponse.json(
      {
        received: false,
        error: message
      },
      { status: 400 }
    );
  }
}
