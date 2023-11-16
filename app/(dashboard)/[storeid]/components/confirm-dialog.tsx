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
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ConfirmDialog = ({
  loading,
  handler,
  name,
}: {
  loading: boolean;
  handler: () => void;
  name: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-5 h-5 opacity-0 absolute -z-50"
          id="confirm-delete"
        >
          delete
        </Button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] `}>
        <DialogHeader>
          <DialogTitle>Delete {name}</DialogTitle>
          <DialogDescription>This action cannot be undone</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose>
            <Button id="close-delete" variant={"outline"}>
              cancel
            </Button>
          </DialogClose>
          <Button
            disabled={loading}
            variant={"destructive"}
            id="confirmBtn"
            onClick={handler}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
