import prisma from "@/prisma/prisma-client";
import PageTitle from "../components/page-title";
import { columns } from "./components/columns";
import { DataTable } from "../components/data-table";
import { Billboard } from "@prisma/client";
import ApiReference from "../components/api-refer";
import { ApiProps } from "@/app/types";
const BillboardPage = async ({ params }: { params: { storeid: string } }) => {
  const data: Billboard[] = await prisma.billboard.findMany({
    where: {
      storeId: params.storeid,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const apiData: ApiProps[] = [
    {
      name: "GET_ALL_BILLBOARDS",
      access: "public",
      route: `/store/${params.storeid}/billboards`,
    },
    {
      name: "POST_CREATE_BILLBOARD",
      access: "admin",
      route: `/store/${params.storeid}/billboards`,
    },
    {
      name: "GET_SINGLE_BILLBOARD",
      access: "public",
      route: `/store/${params.storeid}/billboards/{billboardid}`,
    },
    {
      name: "DELETE_UPDATE_SINGLE_BILLBOARD",
      access: "admin",
      route: `/store/${params.storeid}/billboards/{billboardid}`,
    },
  ];

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
        <DataTable
          data={data}
          columns={columns}
          domId="label"
          filter="billboards"
        />
      </div>
      <ApiReference name="Billboards" data={apiData} />
    </div>
  );
};

export default BillboardPage;
