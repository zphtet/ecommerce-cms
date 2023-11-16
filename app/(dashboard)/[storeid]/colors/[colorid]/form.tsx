"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import toast from "react-hot-toast";
import { Color } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  value: z.string().min(4).max(7),
});
export default function ColorForm({
  editData,
  editMode,
}: {
  editData: null | Color;
  editMode: boolean;
}) {
  const { storeid, colorid } = useParams();
  const router = useRouter();
  const [create, setCreate] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: editData?.value || "",
      name: editData?.name || "",
    },
  });

  const createColor = async (data: { value: string; name: string }) => {
    const createdData = await fetch(`/api/store/${storeid}/colors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        storeId: storeid,
      }),
    });
    toast.success("color created");
    return createdData;
  };

  const editColor = async (data: { name: string; value: string }) => {
    await fetch(`/api/store/${storeid}/colors/${colorid}`, {
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
        await editColor(createData);
      } else {
        await createColor(createData);
      }
      router.push(`/${storeid}/colors`);
      router.refresh();
    } catch (e) {
      toast.error("error creating color");
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
                  <Input placeholder="your color name ..." {...field} />
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
                <FormLabel>Hex Code</FormLabel>
                <FormControl>
                  <Input placeholder="your value ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div
            className={`w-8 h-6 rounded-sm border self-end `}
            style={{
              backgroundColor: `${form.watch("value")}`,
            }}
          ></div>
        </div>

        <Button type="submit" disabled={create}>
          {create && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {editMode ? "update " : "create"}
        </Button>
      </form>
    </Form>
  );
}
