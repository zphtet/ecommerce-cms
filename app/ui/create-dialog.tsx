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
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormProps = {
  name: string;
};

const CreateDialog = ({ text }: { text: string }) => {
  const [loading, setLoading] = useState(false);
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<FormProps>();
  const { errors } = formState;
  const handleCreateStore: SubmitHandler<FormProps> = async (data) => {
    if (!isSignedIn) return;
    setLoading(true);
    const res = await fetch(`/api/store`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        userId: user.id,
      }),
    });
    const createdData = await res.json();
    console.log(createdData);
    router.push(`/${createdData.data.id}`);
    // setLoading(false);
    // document.getElementById("closeDialog")?.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" id="create-store">
          {text}
        </Button>
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
              {...register("name", {
                required: "store name is required",
                minLength: {
                  value: 3,
                  message: "min 3 chars or more",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <DialogClose>
            <Button variant={"outline"}>cancel</Button>
          </DialogClose>
          <Button
            onClick={handleSubmit(handleCreateStore)}
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
