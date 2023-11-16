import prisma from "@/prisma/prisma-client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { sizeid: string } }
) {
  try {
    const data = await prisma.size.findUnique({
      where: {
        id: params.sizeid,
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
  { params }: { params: { sizeid: string } }
) {
  const { userId } = auth();
  if (!userId) return NextResponse.json("Unauthorized", { status: 401 });

  const body = await req.json();
  const data = await prisma.size.update({
    where: {
      id: params.sizeid,
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
  { params }: { params: { sizeid: string } }
) {
  const { userId } = auth();
  if (!userId) return NextResponse.json("Unauthorized", { status: 401 });
  const data = await prisma.size.findUnique({
    where: {
      id: params.sizeid,
    },
  });
  if (!data) return NextResponse.json("Not found", { status: 404 });
  await prisma.size.delete({
    where: {
      id: params.sizeid,
    },
  });
  return NextResponse.json("success", { status: 200 });
}
