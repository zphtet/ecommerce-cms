import prisma from "@/prisma/prisma-client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { categoryid: string } }
) {
  try {
    const data = await prisma.category.findUnique({
      where: {
        id: params.categoryid,
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
  { params }: { params: { categoryid: string } }
) {
  const { userId } = auth();
  if (!userId) return NextResponse.json("Unauthorized", { status: 401 });

  const body = await req.json();
  const data = await prisma.category.update({
    where: {
      id: params.categoryid,
    },
    data: {
      name: body.name,
      billboardId: body.billboardId,
    },
  });

  return NextResponse.json({
    status: "success",
    data: data,
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoryid: string } }
) {
  const { userId } = auth();
  if (!userId) return NextResponse.json("Unauthorized", { status: 401 });
  const data = await prisma.category.findUnique({
    where: {
      id: params.categoryid,
    },
  });
  if (!data) return NextResponse.json("Not found", { status: 404 });
  await prisma.category.delete({
    where: {
      id: params.categoryid,
    },
  });
  return NextResponse.json("success", { status: 200 });
}
