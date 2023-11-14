"use client";
import { notFound, useParams, usePathname } from "next/navigation";
import SubPageTitle from "../../components/sub-page-title";
import BillboardForm from "./form";
import { useEffect, useState } from "react";
const BillboardItem = () => {
  const { billboardid, storeid } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const createNew = billboardid === "new";

  useEffect(() => {
    if (createNew) return;
    fetch(`/api/billboard/${billboardid}`)
      .then((res) => res.json())
      .then((data) => setData(data.data))
      .catch((e) => {
        console.log(e);
        setError(true);
      });
  }, [billboardid]);

  const title = createNew ? "Create New Billboard" : "Edit Billboard";

  if (error) throw new Error("Error fetching billboard");
  if (!createNew && !data) return <div>Loading .. .</div>;
  return (
    <div className="py-5">
      <SubPageTitle
        callbackUrl={`/${storeid}/billboards`}
        desc="manage your billboard"
        editMode={!createNew}
        route="nothing"
        title={title}
      />
      <div className="w-[min(100%,400px)] my-5">
        <BillboardForm editData={data} editMode={!createNew} />
      </div>
    </div>
  );
};

export default BillboardItem;
