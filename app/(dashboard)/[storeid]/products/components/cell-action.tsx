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
import toast from "react-hot-toast";
import { AiOutlineCopy, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import ConfirmDialog from "../../components/confirm-dialog";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useDeleteContext } from "@/context/DeleteContext";
import { ProductColumn } from "./columns";
const CellAction = ({ data }: { data: ProductColumn }) => {
  const product = data;
  const { deleteId, setDeleteId } = useDeleteContext();
  const router = useRouter();
  const { storeid } = useParams();
  const [deleting, setDeleting] = useState(false);

  const showDialog = () => {
    setDeleteId(product.id);
    document.getElementById("confirm-delete")?.click();
  };
  const deleteHandler = async () => {
    try {
      setDeleting(true);
      console.log("delete id", deleteId);
      const res = await fetch(`/api/store/${storeid}/products/${deleteId}`, {
        method: "DELETE",
      });
      await res.json();
      toast.success("deleted successfully");
      router.refresh();
    } catch (e) {
      toast.error("error deleting");
    } finally {
      setDeleting(false);
      document.getElementById("close-delete")?.click();
      setDeleteId(null);
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
          onClick={() => navigator.clipboard.writeText(product.id)}
        >
          <AiOutlineCopy /> Copy ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center cursor-pointer gap-2"
          onClick={() => {
            router.push(`/${storeid}/products/${product.id}`);
          }}
        >
          <AiOutlineEdit /> update
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-2"
          onClick={showDialog}
        >
          <AiOutlineDelete /> delete
        </DropdownMenuItem>
      </DropdownMenuContent>
      <ConfirmDialog
        handler={deleteHandler}
        name="Product"
        loading={deleting}
      />
    </DropdownMenu>
  );
};

export default CellAction;
