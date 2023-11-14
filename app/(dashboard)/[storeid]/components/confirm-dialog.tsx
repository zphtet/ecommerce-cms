import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ConfirmDialog = ({ loading, id }: { loading: boolean; id: string }) => {
  console.log("confirm Dialog rerender");
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const deleteHandler = async () => {
    // console.log("id to delete", id);
    const actionBtn = document.getElementById("action-btn");
    console.dir(actionBtn);
    console.log("deleteId", actionBtn?.dataset.deleteId);
    try {
      setDeleting(true);
      const res = await fetch(`/api/billboard/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log("data", data);
      toast.success("deleted successfully");

      router.refresh();
    } catch (e) {
      console.log(e);
      toast.error("error deleting");
    } finally {
      setDeleting(false);
      document.getElementById("closeDialog")?.click();
    }
  };

  useEffect(() => {
    // if (id) {
    //   const btn = document.getElementById("action-btn");
    //   btn!.className = `${btn?.className} ${id}`;
    //   console.log(btn?.className);
    //   console.log("set data id to dom node");
    // }
  }, [id]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-0 h-0 opacity-0 absolute -z-30"
          id="confirm-delete"
        ></Button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] `}>
        <DialogHeader>
          <DialogTitle>Delete Billboard</DialogTitle>
          <DialogDescription>This action cannot be undone</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose>
            <Button variant={"outline"}>cancel</Button>
          </DialogClose>
          <Button disabled={deleting} id="confirmBtn" onClick={deleteHandler}>
            {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
