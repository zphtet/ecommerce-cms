"use client";
import React, { useState } from "react";
import DeleteBtn from "./delete-btn";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const Title = ({ storeid }: { storeid: string }) => {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const deleteHandler = async () => {
    setDeleting(true);
    try {
      await fetch(`/api/store/${storeid}`, {
        method: "DELETE",
      });
      toast.success("successfully deleted");
      router.push("/");
      router.refresh();
    } catch (e) {
      toast.error("Error deleting store");
    } finally {
      setDeleting(false);
    }
  };
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-3xl font-bold">Settings</h3>
        <p>manage store preferences</p>
      </div>

      <DeleteBtn handler={deleteHandler} loading={deleting} />
    </div>
  );
};

export default Title;
