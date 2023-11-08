import prisma from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { storeid: string };
}) {
  const store = await prisma.store.findUnique({
    where: {
      id: params.storeid,
    },
  });

  if (!store) notFound();

  return (
    <div>
      <p>Welcome to your dashboard {params.storeid}</p>
    </div>
  );
}
