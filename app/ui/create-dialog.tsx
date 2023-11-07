"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
const CreateDialog = () => {
  const [loading, setLoading] = useState(false);

  const handleCreateStore = async () => {
    setLoading(true);

    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("created");
      }, 1000);
    });
    setLoading(false);
    document.getElementById("closeDialog")?.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Store</Button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] `}>
        <DialogHeader>
          <DialogTitle>Create Store</DialogTitle>
          <DialogDescription>
            Add a new store to manage products and categories
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2 items-start">
            <Label htmlFor="name" className="text-right">
              Store Name
            </Label>
            <Input
              id="name"
              placeholder="My Shoes shop"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant={"outline"}>cancel</Button>
          </DialogClose>
          <Button
            onClick={handleCreateStore}
            disabled={loading}
            className={`${loading && "opacity-50 cursor-not-allowed"}`}
            type="submit"
          >
            {loading ? "loading" : "create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDialog;
