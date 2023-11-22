import { BaggageClaim, DollarSign, Layers } from "lucide-react";
import OverviewCard from "./card";
import prisma from "@/prisma/prisma-client";
import { Order } from "@prisma/client";
import OverviewChart from "./chart";

const OverviewCardsContainer = async ({ storeid }: { storeid: string }) => {
  console.log("from overviewCOntainer", storeid);
  const getOrders = async () => {
    const data = await prisma.order.findMany({
      where: {
        storeId: storeid,
      },
    });
    return data;
  };
  const getProducts = async () => {
    const data = await prisma.product.findMany({
      where: {
        storeId: storeid,
      },
    });
    return data;
  };

  const orders = await getOrders();
  const products = await getProducts();

  const totalOrders = orders.length;
  const totalPrice = orders.reduce((accum, item) => {
    return accum + Number(item.price);
  }, 0);
  const totalProducts = products.length;

  return (
    <div className=" py-5 ">
      <div className="flex items-center gap-5">
        <OverviewCard
          icon={<DollarSign size={"20px"} />}
          title="Total Revenues"
          value={totalPrice}
          currency={true}
        />
        <OverviewCard
          icon={<BaggageClaim size={"20px"} />}
          title="Sales "
          value={totalOrders}
        />
        <OverviewCard
          title="Products in-stock"
          icon={<Layers size={"20px"} />}
          value={totalProducts}
        />
      </div>
      {/* chart */}
      <OverviewChart orders={orders} />
    </div>
  );
};

export default OverviewCardsContainer;
