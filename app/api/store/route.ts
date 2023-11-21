import prisma from "@/prisma/prisma-client";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const body = await request.json();
  const createdStore = await prisma.store.create({
    data: {
      ...body,
    },
  });

  return NextResponse.json({
    status: "success",
    data: createdStore,
  });
}

export async function GET(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json("Unauthorized", { status: 401 });
  const data = await prisma.store.findMany({
    where: {
      userId: userId!,
    },
  });
  return NextResponse.json({
    status: "success",
    data,
  });
}
