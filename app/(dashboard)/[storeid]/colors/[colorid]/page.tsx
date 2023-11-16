"use client";
import { useParams } from "next/navigation";
import SubPageTitle from "../../components/sub-page-title";
import { useEffect, useState } from "react";
import ColorForm from "./form";
const CategoryItem = () => {
  const { colorid, storeid } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const createNew = colorid === "new";

  useEffect(() => {
    if (createNew) return;
    fetch(`/api/store/${storeid}/colors/${colorid}`)
      .then((res) => res.json())
      .then((data) => setData(data.data))
      .catch((e) => {
        setError(true);
      });
  }, [colorid]);

  const title = createNew ? "Create New Color" : "Edit Color";

  if (error) throw new Error("Error fetching color");
  if (!createNew && !data) return <div>Loading .. .</div>;
  return (
    <div className="py-5">
      <SubPageTitle
        callbackUrl={`/${storeid}/colors`}
        desc="manage your color"
        editMode={!createNew}
        route={`/api/store/${storeid}/colors/${colorid}`}
        title={title}
      />
      <div className="w-[min(100%,400px)] my-5">
        <ColorForm editData={data} editMode={!createNew} />
      </div>
    </div>
  );
};

export default CategoryItem;
