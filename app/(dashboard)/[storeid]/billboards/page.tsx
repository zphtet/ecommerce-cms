import prisma from "@/prisma/prisma-client";
import PageTitle from "../components/page-title";
import { columns } from "../components/columns";
import { DataTable } from "../components/data-table";
import { Billboard } from "@prisma/client";
const BillboardPage = async ({ params }: { params: { storeid: string } }) => {
  const data: Billboard[] = await prisma.billboard.findMany({
    where: {
      storeId: params.storeid,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // console.log(data);
  return (
    <div className="py-5">
      <PageTitle
        title="Billboards"
        number={data.length}
        desc="Manage your billboards"
        href={`/${params.storeid}/billboards/new`}
      />
      <div className="my-5">
        <DataTable data={data} columns={columns} />
      </div>
    </div>
  );
};

export default BillboardPage;
