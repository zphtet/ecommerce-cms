import prisma from "@/prisma/prisma-client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { colorid: string } }
) {
  try {
    const data = await prisma.color.findUnique({
      where: {
        id: params.colorid,
      },
    });
    return NextResponse.json({
      status: "success",
      data: data,
    });
  } catch (e) {
    throw new Error("Error fetching color");
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { colorid: string } }
) {
  const { userId } = auth();
  if (!userId) return NextResponse.json("Unauthorized", { status: 401 });

  const body = await req.json();
  const data = await prisma.color.update({
    where: {
      id: params.colorid,
    },
    data: {
      name: body.name,
      value: body.value,
    },
  });

  return NextResponse.json({
    status: "success",
    data: data,
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: { colorid: string } }
) {
  const { userId } = auth();
  if (!userId) return NextResponse.json("Unauthorized", { status: 401 });
  const data = await prisma.color.findUnique({
    where: {
      id: params.colorid,
    },
  });
  if (!data) return NextResponse.json("Not found", { status: 404 });
  await prisma.color.delete({
    where: {
      id: params.colorid,
    },
  });
  return NextResponse.json("success", { status: 200 });
}
