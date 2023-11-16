"use client";
import { useParams } from "next/navigation";
import SubPageTitle from "../../components/sub-page-title";
import { useEffect, useState } from "react";
import SizeForm from "./form";
const CategoryItem = () => {
  const { sizeid, storeid } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const createNew = sizeid === "new";

  useEffect(() => {
    if (createNew) return;
    fetch(`/api/store/${storeid}/sizes/${sizeid}`)
      .then((res) => res.json())
      .then((data) => setData(data.data))
      .catch((e) => {
        console.log(e);
        setError(true);
      });
  }, [sizeid]);

  const title = createNew ? "Create New Size" : "Edit Size";

  if (error) throw new Error("Error fetching billboard");
  if (!createNew && !data) return <div>Loading .. .</div>;
  return (
    <div className="py-5">
      <SubPageTitle
        callbackUrl={`/${storeid}/sizes`}
        desc="manage your size"
        editMode={!createNew}
        route={`/api/store/${storeid}/sizes/${sizeid}`}
        title={title}
      />
      <div className="w-[min(100%,400px)] my-5">
        <SizeForm editData={data} editMode={!createNew} />
      </div>
    </div>
  );
};

export default CategoryItem;
