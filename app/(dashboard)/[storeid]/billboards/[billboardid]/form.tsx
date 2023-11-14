"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { CldImage, CldUploadButton, CldUploadWidget } from "next-cloudinary";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import { Billboard } from "@prisma/client";

const formSchema = z.object({
  label: z.string().min(2).max(50),
  image: z.any(),
});
export default function BillboardForm({
  editData,
  editMode,
}: {
  editData: null | Billboard;
  editMode: boolean;
}) {
  const { storeid, billboardid } = useParams();
  const router = useRouter();
  const [create, setCreate] = useState(false);
  const [imgUrl, setImagUrl] = useState(editData?.imageUrl || null);
  const [imgEmpty, setImgEmpty] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: editData?.label || "",
    },
  });

  const creatBillboard = async (data: {
    storeId: string | string[];
    label: string;
    imageUrl: string;
  }) => {
    await fetch(`/api/billboard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    toast.success("billboard created");
  };

  const editBillboard = async (data: {
    storeId?: string | string[];
    label: string;
    imageUrl: string;
  }) => {
    await fetch(`/api/billboard/${billboardid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    toast.success("billboard updated");
  };
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!imgUrl) {
      setImgEmpty(true);
      return;
    }

    const createData = {
      storeId: storeid,
      label: values.label,
      imageUrl: imgUrl,
    };

    try {
      setCreate(true);
      if (editMode) {
        await editBillboard(createData);
      } else {
        await creatBillboard(createData);
      }
      router.push(`/${storeid}/billboards`);
      router.refresh();
    } catch (e) {
      toast.error("Error  billboard");
    } finally {
      setCreate(false);
    }
  }
  const uploadHandler = (event: any) => {
    if (event.info.secure_url) {
      setImagUrl(event.info.secure_url);
      setImgEmpty(false);
    }
  };
  const removeImgHandler = () => {
    setImagUrl(null);
  };

  if (editMode && !editMode) return <div>Loading form ... </div>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input placeholder="your billboard label" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Background Image</FormLabel>
              <FormControl>
                {!imgUrl && (
                  <CldUploadButton
                    className="block px-2 py-1 text-sm bg-gray-800 text-white rounded-md"
                    uploadPreset="koils7d3"
                    {...field}
                    onUpload={uploadHandler}
                  />
                )}
              </FormControl>
              {imgEmpty && <p className="text-sm text-red-500">Upload image</p>}

              <FormMessage />
            </FormItem>
          )}
        />
        {imgUrl && (
          <div
            onClick={removeImgHandler}
            className="w-max px-2 py-2 rounded cursor-pointer  bg-red-600 text-white"
          >
            <AiOutlineDelete />
          </div>
        )}
        {imgUrl && (
          <CldImage
            width="300"
            height="300"
            src={imgUrl}
            alt="bill board image"
          />
        )}

        <Button
          type="submit"
          // className={`${saving && "opacity-80"}`}
          disabled={create}
        >
          {create && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {editMode ? "update " : "create"}
        </Button>
      </form>
    </Form>
  );
}
