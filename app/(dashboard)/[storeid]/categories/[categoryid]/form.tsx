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
import { Billboard, Category } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  billboard: z.string({
    required_error: "Please select billboard to display.",
  }),
});
export default function CategoryForm({
  editData,
  editMode,
}: {
  editData: null | Category;
  editMode: boolean;
}) {
  const { storeid, categoryid } = useParams();
  const router = useRouter();
  const [create, setCreate] = useState(false);
  const [selectData, setSelectData] = useState<null | Billboard[]>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      billboard: editData?.billboardId || undefined,
      name: editData?.name,
    },
  });

  const createCategory = async (data: {
    billboardId: string | string[];
    name: string;
  }) => {
    const createdData = await fetch(`/api/store/${storeid}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        storeId: storeid,
      }),
    });
    toast.success("category created");
    return createdData;
  };

  const editCategory = async (data: { name: string; billboardId: string }) => {
    await fetch(`/api/store/${storeid}/categories/${categoryid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    toast.success("category updated");
  };
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const createData = {
      name: values.name,
      billboardId: values.billboard,
    };
    try {
      setCreate(true);
      if (editMode) {
        await editCategory(createData);
      } else {
        await createCategory(createData);
      }
      router.push(`/${storeid}/categories`);
      router.refresh();
    } catch (e) {
      toast.error("error creating category");
    } finally {
      setCreate(false);
    }
  }

  useEffect(() => {
    fetch(`/api/store/${storeid}/billboards`)
      .then((res) => res.json())
      .then((data) => {
        setSelectData(data.data);
      })
      .catch((e) => {
        toast.error("Error fetching billboards");
      });
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input placeholder="your category name ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="billboard"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Billboard</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select  billboard to display" />
                  </SelectTrigger>
                </FormControl>
                {selectData && (
                  <SelectContent>
                    {selectData.map((billboard) => {
                      return (
                        <SelectItem value={billboard.id} key={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                )}
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={create}>
          {create && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {editMode ? "update " : "create"}
        </Button>
      </form>
    </Form>
  );
}
