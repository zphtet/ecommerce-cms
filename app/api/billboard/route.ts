import prisma from "@/prisma/prisma-client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json("Unauthorized", { status: 401 });
  const body = await req.json();

  const createdData = await prisma.billboard.create({
    data: body,
  });

  return NextResponse.json({
    status: "success",
    data: createdData,
  });
}
