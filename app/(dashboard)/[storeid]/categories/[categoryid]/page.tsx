"use client";
import { useParams } from "next/navigation";
import SubPageTitle from "../../components/sub-page-title";
import { useEffect, useState } from "react";
import CategoryForm from "./form";
const CategoryItem = () => {
  const { categoryid, storeid } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const createNew = categoryid === "new";

  useEffect(() => {
    if (createNew) return;
    fetch(`/api/store/${storeid}/categories/${categoryid}`)
      .then((res) => res.json())
      .then((data) => setData(data.data))
      .catch((e) => {
        console.log(e);
        setError(true);
      });
  }, [categoryid]);

  const title = createNew ? "Create New Category" : "Edit Category";

  if (error) throw new Error("Error fetching billboard");
  if (!createNew && !data) return <div>Loading .. .</div>;
  return (
    <div className="py-5">
      <SubPageTitle
        callbackUrl={`/${storeid}/categories`}
        desc="manage your category"
        editMode={!createNew}
        route={`/api/store/${storeid}/categories/${categoryid}`}
        title={title}
      />
      <div className="w-[min(100%,400px)] my-5">
        <CategoryForm editData={data} editMode={!createNew} />
      </div>
    </div>
  );
};

export default CategoryItem;
