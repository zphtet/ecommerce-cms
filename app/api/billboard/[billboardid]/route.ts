import prisma from "@/prisma/prisma-client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { billboardid: string } }
) {
  try {
    const data = await prisma.billboard.findUnique({
      where: {
        id: params.billboardid,
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
  { params }: { params: { billboardid: string } }
) {
  const { userId } = auth();
  if (!userId) return NextResponse.json("Unauthorized", { status: 401 });

  const body = await req.json();
  const data = await prisma.billboard.update({
    where: {
      id: params.billboardid,
    },
    data: {
      label: body.label,
      imageUrl: body.imageUrl || undefined,
    },
  });

  return NextResponse.json({
    status: "success",
    data: data,
  });
}
