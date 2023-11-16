"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { CldImage, CldUploadButton, CldUploadWidget } from "next-cloudinary";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Size } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  value: z.string().min(1).max(50),
});
export default function SizeForm({
  editData,
  editMode,
}: {
  editData: null | Size;
  editMode: boolean;
}) {
  const { storeid, sizeid } = useParams();
  const router = useRouter();
  const [create, setCreate] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // label: editData?.label || "",
      // billboard: "m@google.com",
      value: editData?.value || "",
      name: editData?.name || "",
    },
  });

  const createSize = async (data: { value: string; name: string }) => {
    const createdData = await fetch(`/api/store/${storeid}/sizes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        storeId: storeid,
      }),
    });
    toast.success("size created");
    return createdData;
  };

  const editSize = async (data: { name: string; value: string }) => {
    await fetch(`/api/store/${storeid}/sizes/${sizeid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    toast.success("size updated");
  };
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const createData = {
      name: values.name,
      value: values.value,
    };
    try {
      setCreate(true);
      if (editMode) {
        await editSize(createData);
      } else {
        await createSize(createData);
      }
      router.push(`/${storeid}/sizes`);
      router.refresh();
    } catch (e) {
      toast.error("error creating size");
    } finally {
      setCreate(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
        <div className="flex items-center gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="your size name ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
                <FormControl>
                  <Input placeholder="your value ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={create}>
          {create && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {editMode ? "update " : "create"}
        </Button>
      </form>
    </Form>
  );
}
