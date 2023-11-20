import prisma from "@/prisma/prisma-client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json("Unauthorized", { status: 401 });
  const body = await req.json();

  const createdData = await prisma.product.create({
    data: body,
  });

  return NextResponse.json({
    status: "success",
    data: createdData,
  });
}

export async function GET(
  req: Request,
  { params }: { params: { storeid: string } }
) {
  const { searchParams } = new URL(req.url);
  const isFeatured = searchParams.get("featured");
  const category = searchParams.get("category");
  const categoryId = searchParams.get("categoryId");
  const size = searchParams.get("size");
  const color = searchParams.get("color");
  const limit = searchParams.get("limit");
  const data = await prisma.product.findMany({
    skip: 0,
    take: Number(limit) ? Number(limit) : undefined,
    where: {
      storeId: params.storeid,
      isFeatured: isFeatured ? true : undefined,
      categoryId: categoryId ? categoryId : undefined,
    },
    include: {
      category: category ? true : undefined,
      size: size ? true : undefined,
      color: color ? true : undefined,
    },
  });
  return NextResponse.json({
    status: "success",
    count: data.length,
    data,
  });
}
