import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("Received Cart Items", body);
  return NextResponse.json(body);
}
