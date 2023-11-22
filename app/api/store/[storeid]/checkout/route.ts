import prisma from "@/prisma/prisma-client";
import { NextResponse } from "next/server";
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { stripe } from "@/lib/stripe";

type CartItemType = {
  id: string;
  imgUrl: string;
  color: string;
  size: string;
  name: string;
  price: string;
};
export async function POST(
  request: Request,
  { params }: { params: { storeid: string } }
) {
  const body = (await request.json()) as CartItemType[];

  const ids = body.map((item) => item.id);
  const price = body.reduce((accum, item) => {
    return Number(item.price) + accum;
  }, 0);
  const order = await prisma.order.create({
    data: {
      storeId: params.storeid,
      isPaid: false,
      price: price.toString(),
      orderItems: {
        create: ids.map((productId: string) => ({
          product: {
            connect: {
              id: productId,
            },
          },
        })),
      },
    },
  });
  const lineItems = body.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.imgUrl],
        },
        unit_amount: Number(item.price),
      },
      quantity: 1,
    };
  });
  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [...lineItems],
      mode: "payment",
      phone_number_collection: {
        enabled: true,
      },
      billing_address_collection: "required",
      success_url: `${process.env.STRIPE_FRONTEND_URL}/?success=true`,
      cancel_url: `${process.env.STRIPE_FRONTEND_URL}/?canceled=true`,
      metadata: {
        orderId: order.id,
      },
    });
    return NextResponse.json({
      url: session.url,
    });
  } catch (err: any) {
    return NextResponse.json({ status: "fail", message: err.message });
  }
  //   return NextResponse.json(body);
}
