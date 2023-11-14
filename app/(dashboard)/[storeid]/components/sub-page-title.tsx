"use client";
import { useState } from "react";
import DeleteBtn from "./delete-btn";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Separator } from "@/components/ui/separator";
type Props = {
  title: string;
  desc: string;
  route: string;
  callbackUrl: string;
  editMode: boolean;
};
const SubPageTitle: React.FC<Props> = ({
  title,
  desc,
  route,
  callbackUrl,
  editMode,
}) => {
  const [deleting, setDeleting] = useState(false);

  const router = useRouter();
  const deleteHandler = async () => {
    setDeleting(true);
    try {
      await fetch(`${route}`, {
        method: "DELETE",
      });
      toast.success("successfully deleted");
      router.push(callbackUrl);
      router.refresh();
    } catch (e) {
      toast.error("Error deleting store");
    } finally {
      setDeleting(false);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-bold">{title}</h3>
          <p>{desc}</p>
        </div>
        {editMode && <DeleteBtn loading={deleting} handler={deleteHandler} />}
      </div>
      <Separator className="mt-3" />
    </>
  );
};

export default SubPageTitle;
