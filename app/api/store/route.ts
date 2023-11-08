import prisma from "@/prisma/prisma-client";
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
