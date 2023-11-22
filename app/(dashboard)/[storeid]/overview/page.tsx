import { Separator } from "@/components/ui/separator";
import React from "react";
import OverviewCardsContainer from "./components/cards-container";
const OverviewPage = ({ params }: { params: { storeid: string } }) => {
  return (
    <div className="py-5">
      <div>
        <h5 className="text-2xl font-bold">Dashboard</h5>
        <p>Overview of your dashboard</p>
        <Separator className="mt-3" />
        <OverviewCardsContainer storeid={params.storeid} />
      </div>
    </div>
  );
};

export default OverviewPage;
