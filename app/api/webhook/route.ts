import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma-client";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.WEB_HOOK_SEC!
    );
  } catch (e: any) {
    return new NextResponse(`Webhook error ${e.message}`, { status: 400 });
  }
  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;
  const phone = session.customer_details?.phone;
  const addressArr = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.country,
  ];
  const addressStr = addressArr.filter((text) => text !== null).join(",");

  if (event.type === "checkout.session.completed") {
    const order = await prisma.order.update({
      where: {
        id: session?.metadata?.orderId,
      },
      data: {
        isPaid: true,
        address: addressStr,
        phone: phone!,
      },
    });
  }
  return new NextResponse(null, { status: 200 });
}
