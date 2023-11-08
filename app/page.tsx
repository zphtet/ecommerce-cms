import { UserButton, auth } from "@clerk/nextjs";
import CreateDialog from "./ui/create-dialog";
import prisma from "@/prisma/prisma-client";
import { redirect } from "next/navigation";
export default async function Page() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const store = await prisma.store.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      id: "desc",
    },
  });

  if (store) return redirect(`/${store.id}`);

  return (
    <div className="w-screen h-screen grid place-items-center">
      <CreateDialog text={"Create Your First Store"} />
    </div>
  );
}
