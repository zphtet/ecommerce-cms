import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AiOutlineCopy, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import ConfirmDialog from "../../components/confirm-dialog";
import { useState } from "react";
import { useDeleteContext } from "@/context/DeleteContext";
import { Size } from "@prisma/client";
const CellAction = ({ data }: { data: Size }) => {
  const size = data;
  const router = useRouter();
  const { storeid } = useParams();
  const [deleting, setDeleting] = useState(false);
  const { deleteId, setDeleteId } = useDeleteContext();
  const showConifrmDialog = () => {
    setDeleteId(size.id);
    document.getElementById("confirm-delete")?.click();
  };

  const deleteHandler = async () => {
    try {
      setDeleting(true);
      const res = await fetch(`/api/store/${storeid}/sizes/${deleteId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      toast.success("deleted successfully");
      router.refresh();
    } catch (e) {
      toast.error("error deleting");
    } finally {
      // do something
      setDeleteId(null);
      document.getElementById("close-delete")?.click();
      setDeleting(false);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" id="action-btn">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          className="flex items-center cursor-pointer gap-2"
          onClick={() => navigator.clipboard.writeText(size.id)}
        >
          <AiOutlineCopy /> Copy ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center cursor-pointer gap-2"
          onClick={() => {
            router.push(`/${storeid}/sizes/${size.id}`);
          }}
        >
          <AiOutlineEdit /> update
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-2"
          onClick={showConifrmDialog}
        >
          <AiOutlineDelete /> delete
        </DropdownMenuItem>
      </DropdownMenuContent>
      <ConfirmDialog
        name="Category"
        loading={deleting}
        handler={deleteHandler}
      />
    </DropdownMenu>
  );
};

export default CellAction;
