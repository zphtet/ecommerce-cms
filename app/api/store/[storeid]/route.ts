import prisma from "@/prisma/prisma-client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeid: string } }
) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }
  const body = await req.json();

  const data = await prisma.store.update({
    where: {
      id: params.storeid,
    },
    data: {
      name: body.storename.trim(),
    },
  });

  return NextResponse.json({
    status: "success",
    data,
  });
}

export async function GET(
  req: Request,
  { params }: { params: { storeid: string } }
) {
  const data = await prisma.store.findUnique({
    where: {
      id: params.storeid,
    },
  });
  if (!data) return NextResponse.json("Not Found", { status: 404 });

  return NextResponse.json({
    status: "success",
    data,
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeid: string } }
) {
  await prisma.store.delete({
    where: {
      id: params.storeid,
    },
  });

  return NextResponse.json({
    status: "success",
  });
}
