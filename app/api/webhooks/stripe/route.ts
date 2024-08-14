import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createOrder } from '@/lib/actions/order.action'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {

  console.log("Webhook hit");
  const body = await request.text()

  console.log(body);

  const sig = request.headers.get('stripe-signature') as string
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event : Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    return NextResponse.json({ message: 'Webhook error', error: err })
  }

  // Get the ID and type
  const eventType = event.type

  // CREATE
  if (eventType === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const order = {
      orderId: session.id,
      eventId: session.metadata?.eventId || '',
      userId: session.metadata?.buyerId || '',
      amount: session.amount_total ? (session.amount_total / 100).toString() : '0',
      createdAt: new Date(),
    };

    const newOrder = await createOrder(order)
    return NextResponse.json({ message: 'OK', order: newOrder })
  }

  return new Response('', { status: 200 })
}