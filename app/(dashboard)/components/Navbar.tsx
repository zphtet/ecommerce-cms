import { UserButton, auth } from "@clerk/nextjs";
import StoresCombo from "./Stores";
import NavLinks from "./nav-links";
import prisma from "@/prisma/prisma-client";
const Navbar = async () => {
  const { userId } = auth();
  console.log("Navbar rerendered");
  const allStores = await prisma.store.findMany({
    where: {
      userId: userId!,
    },
  });

  return (
    <div className="border-b py-3  flex items-center justify-between">
      <div className="flex items-center gap-5">
        <StoresCombo stores={allStores} />
        <NavLinks />
      </div>
      <UserButton />
    </div>
  );
};

export default Navbar;
