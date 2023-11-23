import prisma from "@/prisma/prisma-client";
import PageTitle from "../components/page-title";
import { DataTable } from "../components/data-table";
import ApiReference from "../components/api-refer";
import { ApiProps } from "@/app/types";
import { columns } from "./components/columns";

const CategoryPage = async ({ params }: { params: { storeid: string } }) => {
  const data = await prisma.color.findMany({
    where: {
      storeId: params.storeid,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const apiData: ApiProps[] = [
    {
      name: "GET_ALL_COLORS",
      access: "public",
      route: `/store/${params.storeid}/colors`,
    },
    {
      name: "POST_CREATE_COLOR",
      access: "admin",
      route: `/store/${params.storeid}/colors`,
    },
    {
      name: "GET_SINGLE_COLOR",
      access: "public",
      route: `/store/${params.storeid}/colors/{colorid}`,
    },
    {
      name: "DELETE_UPDATE_SINGLE_COLOR",
      access: "admin",
      route: `/store/${params.storeid}/colors/{colorid}`,
    },
  ];

  return (
    <div className="py-5">
      <PageTitle
        title="Colors"
        number={data.length}
        desc="Manage your colors"
        href={`/${params.storeid}/colors/new`}
      />
      <div className="my-5">
        <DataTable data={data} columns={columns} domId="name" filter="colors" />
      </div>
      <ApiReference name="Colors" data={apiData} />
    </div>
  );
};

export default CategoryPage;
