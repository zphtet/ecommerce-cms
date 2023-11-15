import prisma from "@/prisma/prisma-client";
import PageTitle from "../components/page-title";
import { DataTable } from "../components/data-table";
import { Category } from "@prisma/client";
import ApiReference from "../components/api-refer";
import { ApiProps } from "@/app/types";
import { columns, CategoryColumn } from "./components/components/columns";

const CategoryPage = async ({ params }: { params: { storeid: string } }) => {
  const data = await prisma.category.findMany({
    where: {
      storeId: params.storeid,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      billboard: true,
    },
  });

  const apiData: ApiProps[] = [
    {
      name: "GET_ALL_CATEGORIES",
      access: "public",
      route: `/store/${params.storeid}/categories`,
    },
    {
      name: "POST_CREATE_CATEGORY",
      access: "admin",
      route: `/store/${params.storeid}/categories`,
    },
    {
      name: "GET_SINGLE_CATEGORY",
      access: "public",
      route: `/store/${params.storeid}/categories/{categoryid}`,
    },
    {
      name: "DELETE_SINGLE_CATEGORY",
      access: "admin",
      route: `/store/${params.storeid}/categories/{categoryid}`,
    },
  ];

  const modifiedData: CategoryColumn[] = data.map((category) => {
    return {
      id: category.id,
      billboardLabel: category.billboard.label,
      name: category.name,
      createdAt: category.createdAt,
      // storeId: category.storeId,
    };
  });
  return (
    <div className="py-5">
      <PageTitle
        title="Categoried"
        number={data.length}
        desc="Manage your categories"
        href={`/${params.storeid}/categories/new`}
      />
      <div className="my-5">
        <DataTable
          data={modifiedData}
          columns={columns}
          domId="name"
          filter="categories"
        />
      </div>
      <ApiReference name="Categories" data={apiData} />
    </div>
  );
};

export default CategoryPage;
