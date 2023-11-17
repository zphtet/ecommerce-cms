import prisma from "@/prisma/prisma-client";
import PageTitle from "../components/page-title";
import { columns } from "./components/columns";
import { DataTable } from "../components/data-table";
import ApiReference from "../components/api-refer";
import { ApiProps } from "@/app/types";
const ProductPage = async ({ params }: { params: { storeid: string } }) => {
  const data = await prisma.product.findMany({
    where: {
      storeId: params.storeid,
    },
    include: {
      color: true,
      size: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const apiData: ApiProps[] = [
    {
      name: "GET_ALL_PRODUCTS",
      access: "public",
      route: `/store/${params.storeid}/products`,
    },
    {
      name: "POST_CREATE_PRODUCT",
      access: "admin",
      route: `/store/${params.storeid}/products`,
    },
    {
      name: "GET_SINGLE_PRODUCT",
      access: "public",
      route: `/store/${params.storeid}/products/{productid}`,
    },
    {
      name: "DELETE_SINGLE_PRODUCT",
      access: "admin",
      route: `/store/${params.storeid}/products/{productid}`,
    },
  ];

  const modifiedData = data.map((product) => {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      isArchived: product.isArchived,
      isFeatured: product.isFeatured,
      category: product.category.name,
      size: product.size.value,
      color: product.color.value,
      createdAt: product.createdAt,
    };
  });
  return (
    <div className="py-5">
      <PageTitle
        title="Products"
        number={data.length}
        desc="Manage your products"
        href={`/${params.storeid}/products/new`}
      />
      <div className="my-5">
        <DataTable
          data={modifiedData}
          columns={columns}
          domId="name"
          filter="products"
        />
      </div>
      <ApiReference name="Products" data={apiData} />
    </div>
  );
};

export default ProductPage;
