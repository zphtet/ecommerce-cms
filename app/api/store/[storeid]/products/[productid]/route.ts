import prisma from "@/prisma/prisma-client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { productid: string } }
) {
  try {
    const data = await prisma.product.findUnique({
      where: {
        id: params.productid,
      },
      include: {
        category: true,
        color: true,
        size: true,
      },
    });
    return NextResponse.json({
      status: "success",
      data: data,
    });
  } catch (e) {
    throw new Error("Error fetching billboard");
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productid: string } }
) {
  const { userId } = auth();
  if (!userId) return NextResponse.json("Unauthorized", { status: 401 });

  const body = await req.json();
  const data = await prisma.product.update({
    where: {
      id: params.productid,
    },
    data: body,
  });

  return NextResponse.json({
    status: "success",
    data: data,
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: { productid: string } }
) {
  const { userId } = auth();
  if (!userId) return NextResponse.json("Unauthorized", { status: 401 });
  const data = await prisma.product.findUnique({
    where: {
      id: params.productid,
    },
  });
  if (!data) return NextResponse.json("Not found", { status: 404 });
  await prisma.product.delete({
    where: {
      id: params.productid,
    },
  });
  return NextResponse.json("success", { status: 200 });
}
