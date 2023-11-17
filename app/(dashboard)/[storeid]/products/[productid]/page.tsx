"use client";
import { notFound, useParams, usePathname } from "next/navigation";
import SubPageTitle from "../../components/sub-page-title";
import ProductForm from "./form";
import { useEffect, useState } from "react";
const BillboardItem = () => {
  const { productid, storeid } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const createNew = productid === "new";

  useEffect(() => {
    if (createNew) return;
    fetch(`/api/store/${storeid}/products/${productid}`)
      .then((res) => res.json())
      .then((data) => setData(data.data))
      .catch((e) => {
        console.log(e);
        setError(true);
      });
  }, [productid]);

  const title = createNew ? "Create New Product" : "Edit Product";

  if (error) throw new Error("Error fetching product");
  if (!createNew && !data) return <div>Loading .. .</div>;
  return (
    <div className="py-5">
      <SubPageTitle
        callbackUrl={`/${storeid}/products`}
        desc="manage your product"
        editMode={!createNew}
        route={`/api/store/${storeid}/products/${productid}`}
        title={title}
      />
      <div className="w-[min(100%)] my-5">
        <ProductForm editData={data} editMode={!createNew} />
      </div>
    </div>
  );
};

export default BillboardItem;
