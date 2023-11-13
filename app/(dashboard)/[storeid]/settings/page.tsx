import React from "react";
import Title from "./title";
import { Separator } from "@/components/ui/separator";
import SettingForm from "./form";
import Api from "@/app/ui/api-com";
import prisma from "@/prisma/prisma-client";
const SettingPage = async ({ params }: { params: { storeid: string } }) => {
  const store = await prisma.store.findUnique({
    where: {
      id: params.storeid,
    },
  });

  return (
    <div className="py-5">
      <Title storeid={store?.id!} />
      <Separator className="mt-3" />
      <div className="w-[min(100%,400px)] mt-5">
        <SettingForm defaultStoreName={store?.name!} />
      </div>
      <div className="py-5">
        <Api
          access="public"
          name="GET_STORE_URL"
          route={`/store/${params.storeid}`}
        />
      </div>
    </div>
  );
};

export default SettingPage;
