import prisma from "@/prisma/prisma-client";
import PageTitle from "../components/page-title";
import { DataTable } from "../components/data-table";
import ApiReference from "../components/api-refer";
import { ApiProps } from "@/app/types";
import { columns } from "./components/columns";

const CategoryPage = async ({ params }: { params: { storeid: string } }) => {
  const data = await prisma.size.findMany({
    where: {
      storeId: params.storeid,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const apiData: ApiProps[] = [
    {
      name: "GET_ALL_SIZE",
      access: "public",
      route: `/store/${params.storeid}/sizes`,
    },
    {
      name: "POST_CREATE_SIZE",
      access: "admin",
      route: `/store/${params.storeid}/sizes`,
    },
    {
      name: "GET_SINGLE_SIZE",
      access: "public",
      route: `/store/${params.storeid}/sizes/{sizeid}`,
    },
    {
      name: "DELETE_UPDATE_SINGLE_SIZE",
      access: "admin",
      route: `/store/${params.storeid}/sizes/{sizeid}`,
    },
  ];

  return (
    <div className="py-5">
      <PageTitle
        title="Sizes"
        number={data.length}
        desc="Manage your sizes"
        href={`/${params.storeid}/sizes/new`}
      />
      <div className="my-5">
        <DataTable data={data} columns={columns} domId="name" filter="sizes" />
      </div>
      <ApiReference name="Sizes" data={apiData} />
    </div>
  );
};

export default CategoryPage;
