import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { insertRevenueEvent } from '@/lib/services/supabase';
import { getEnv } from '@/lib/services/env';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const secretKey = getEnv('STRIPE_SECRET_KEY');
  const webhookSecret = getEnv('STRIPE_WEBHOOK_SECRET');

  if (!secretKey || !webhookSecret) {
    return NextResponse.json({ error: 'Stripe is not configured' }, { status: 503 });
  }

  const stripe = new Stripe(secretKey);
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 });
  }

  const payload = await request.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Webhook verification failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (
    event.type === 'checkout.session.completed' ||
    event.type === 'invoice.paid' ||
    event.type === 'customer.subscription.created'
  ) {
    const object = event.data.object as { id?: string; amount_total?: number; currency?: string; metadata?: Record<string, string> };
    await insertRevenueEvent({
      provider: 'stripe',
      stripe_event_id: event.id,
      event_type: event.type,
      amount: object.amount_total ? object.amount_total / 100 : null,
      currency: object.currency ?? 'usd',
      product_slug: object.metadata?.product_slug ?? null,
      occurred_at: new Date(event.created * 1000).toISOString(),
      raw: event,
    }).catch(() => null);
  }

  return NextResponse.json({ received: true, eventType: event.type });
}
