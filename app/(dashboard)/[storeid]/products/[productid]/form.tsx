"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Category, Color, Product, Size } from "@prisma/client";
import ImgCard from "../components/img-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
const formSchema = z.object({
  name: z.string().min(2).max(50),
  price: z.string().min(1).max(50),
  image: z.any(),
  category: z.string({
    required_error: "Please select category to display.",
  }),
  size: z.string({
    required_error: "Please select category to display.",
  }),
  color: z.string({
    required_error: "Please select category to display.",
  }),
  featured: z.boolean().default(false).optional(),
  archived: z.boolean().default(false).optional(),
});

type CreateDataType = {
  storeId: string | string[];
  name: string;
  price: string;
  categoryId: string;
  colorId: string;
  sizeId: string;
  images: string[];
  isFeatured: boolean;
  isArchived: boolean;
};
type EditDataType = Product & {
  category: Category;
  size: Size;
  color: Color;
};
export default function ProductForm({
  editData,
  editMode,
}: {
  editData: null | EditDataType;
  editMode: boolean;
}) {
  const { storeid, productid } = useParams();
  const router = useRouter();
  const [create, setCreate] = useState(false);
  const [ImgUrls, setImgUrls] = useState<string[] | []>(editData?.images || []);
  const [imgEmpty, setImgEmpty] = useState(false);
  const [categoryData, setCategoryData] = useState<Category[] | null>(null);
  const [sizeData, setSizeData] = useState<Size[] | null>(null);
  const [colorData, setColorData] = useState<Color[] | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: editData?.name || "",
      price: `${Number(editData?.price) / 100}` || "",
      featured: editData?.isFeatured || false,
      archived: editData?.isArchived || false,
      category: editData?.category.id || undefined,
      size: editData?.size.id || undefined,
      color: editData?.color.id || undefined,
    },
  });

  const noImages = ImgUrls?.length <= 0;

  const createProduct = async (data: CreateDataType) => {
    await fetch(`/api/store/${storeid}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    toast.success("product created");
  };

  const editProduct = async (data: CreateDataType) => {
    await fetch(`/api/store/${storeid}/products/${productid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    toast.success("proudct updated");
  };
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (noImages) {
      setImgEmpty(true);
      return;
    }

    console.log(values);

    // return;
    const createData = {
      storeId: storeid,
      name: values.name,
      price: `${Number(values.price) * 100}`,
      categoryId: values.category,
      colorId: values.color,
      sizeId: values.size,
      images: ImgUrls,
      isFeatured: values.featured || false,
      isArchived: values.archived || false,

      // imageUrl: imgUrls,
    };

    try {
      setCreate(true);
      if (editMode) {
        await editProduct(createData);
      } else {
        await createProduct(createData);
      }
      router.push(`/${storeid}/products`);
      router.refresh();
    } catch (e) {
      toast.error("Error creating product");
    } finally {
      setCreate(false);
    }
  }

  const removeImgHandler = (imgUrl: string) => {
    const filtered = ImgUrls.filter((url) => url !== imgUrl);
    setImgUrls(filtered);
  };

  useEffect(() => {
    fetch(`/api/store/${storeid}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategoryData(data.data);
      });

    fetch(`/api/store/${storeid}/colors`)
      .then((res) => res.json())
      .then((data) => {
        setColorData(data.data);
      });

    fetch(`/api/store/${storeid}/sizes`)
      .then((res) => res.json())
      .then((data) => {
        setSizeData(data.data);
      });
  }, []);

  if (editMode && !editMode) return <div>Loading form ... </div>;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* images */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                {
                  <CldUploadWidget
                    uploadPreset="koils7d3"
                    onSuccess={(result, { widget }) => {
                      console.log(result, "image upload result");
                      setImgUrls((prev) => {
                        // @ts-ignore
                        return [...prev, result.info.secure_url];
                      });
                      setImgEmpty(false);
                    }}
                  >
                    {({ open }) => {
                      function handleOnClick() {
                        open();
                      }
                      return (
                        <div
                          className="bg-gray-500 w-max px-3 py-1 rounded-sm text-white cursor-pointer"
                          onClick={handleOnClick}
                        >
                          Upload Images
                        </div>
                      );
                    }}
                  </CldUploadWidget>
                }
              </FormControl>
              {noImages && imgEmpty && (
                <p className="text-sm text-red-500">Upload image</p>
              )}

              <FormMessage />
            </FormItem>
          )}
        />
        {!noImages && (
          <div className="flex items-center gap-2 ">
            {ImgUrls.map((url) => {
              return (
                <ImgCard imgUrl={url} key={url} handler={removeImgHandler} />
              );
            })}
          </div>
        )}

        <div className="flex items-center gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="your product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="min-w-[200px]">
                      <SelectValue placeholder="Select category " />
                    </SelectTrigger>
                  </FormControl>
                  {
                    <SelectContent>
                      {categoryData &&
                        categoryData.map((category) => {
                          return (
                            <SelectItem value={category.id} key={category.id}>
                              {category.name}
                            </SelectItem>
                          );
                        })}
                    </SelectContent>
                  }
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-3 ">
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sizes</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="min-w-[200px]">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                  </FormControl>
                  {
                    <SelectContent>
                      {sizeData &&
                        sizeData.map((size) => {
                          return (
                            <SelectItem value={size.id} key={size.id}>
                              {size.name}
                            </SelectItem>
                          );
                        })}
                    </SelectContent>
                  }
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Colors</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="min-w-[200px]">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {colorData &&
                      colorData.map((color) => {
                        return (
                          <SelectItem value={color.id} key={color.id}>
                            <div
                              className="w-[100px] h-[10px]"
                              style={{
                                backgroundColor: `${color.value}`,
                              }}
                            ></div>
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-2">
          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Featured</FormLabel>
                  <FormDescription>
                    this product will appear on your home page
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="archived"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Archived</FormLabel>
                  <FormDescription>
                    this product will be archived and appeared no where
                  </FormDescription>
                </div>
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
