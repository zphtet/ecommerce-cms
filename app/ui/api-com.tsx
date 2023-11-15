"use client";
import { CgDatabase } from "react-icons/cg";
import { useOrigin } from "@/hooks/useOrigin";
import { MdContentCopy } from "react-icons/md";
import toast from "react-hot-toast";
import { ApiProps } from "../types";
const Api = ({ name, access, route }: ApiProps) => {
  const siteOrigin = useOrigin();
  const clickHandler = () => {
    navigator.clipboard.writeText(`${siteOrigin}/api${route}`);
    toast.success("successfully copied");
  };
  return (
    <div className=" w-[min(100%)] relative flex gap-5 bg-gray-100 py-4 px-5 items-start">
      <div className="pt-1">
        <CgDatabase />
      </div>
      <div className="flex-1 w-max">
        <p className="font-bold flex items-center">
          {name}
          <span
            className={`ml-5 text-white font-normal text-sm px-3 rounded-full pb-0.5 border ${
              access === "public" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {access}
          </span>
        </p>
        <p className="w-full text-sm mt-2">{`${siteOrigin}/api${route}`}</p>
      </div>
      <button className="absolute right-5 bottom-4 " onClick={clickHandler}>
        <MdContentCopy />
      </button>
    </div>
  );
};

export default Api;
