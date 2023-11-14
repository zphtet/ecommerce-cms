import prisma from "@/prisma/prisma-client";
import PageTitle from "../components/page-title";

const BillboardPage = async ({ params }: { params: { storeid: string } }) => {
  const numBillboards = await prisma.billboard.count({
    where: {
      storeId: params.storeid,
    },
  });
  return (
    <div className="py-5">
      <PageTitle
        title="Billboards"
        number={numBillboards}
        desc="Manage your billboards"
        href={`/${params.storeid}/billboards/new`}
      />
    </div>
  );
};

export default BillboardPage;
