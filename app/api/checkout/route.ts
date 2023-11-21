import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { MdAssignmentReturn } from "react-icons/md";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

type CartItemType = {
  id: string;
  imgUrl: string;
  color: string;
  size: string;
  name: string;
  price: string;
};
export async function POST(request: Request) {
  const body = (await request.json()) as CartItemType[];
  console.log("Received Cart Items", body);

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
      success_url: `${process.env.STRIPE_FRONTEND_URL}/?success=true`,
      cancel_url: `${process.env.STRIPE_FRONTEND_URL}/?canceled=true`,
    });
    return NextResponse.json({
      url: session.url,
    });
  } catch (err: any) {
    return NextResponse.json({ status: "fail", message: err.message });
  }
  //   return NextResponse.json(body);
}
