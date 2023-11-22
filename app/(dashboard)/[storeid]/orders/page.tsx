import prisma from "@/prisma/prisma-client";
import PageTitle from "../components/page-title";
import { DataTable } from "../components/data-table";
import ApiReference from "../components/api-refer";
import { columns } from "./components/columns";

const CategoryPage = async ({ params }: { params: { storeid: string } }) => {
  const data = await prisma.order.findMany({
    where: {
      storeId: params.storeid,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      orderItems: true,
    },
  });

  return (
    <div className="py-5">
      <PageTitle
        title="Orders"
        number={data.length}
        desc="Manage your orders"
        isNew={false}
        href={`/${params.storeid}/orders/new`}
      />
      <div className="my-5">
        <DataTable data={data} columns={columns} domId="name" filter="orders" />
      </div>
    </div>
  );
};

export default CategoryPage;
