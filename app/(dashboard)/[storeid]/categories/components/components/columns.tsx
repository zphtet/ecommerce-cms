"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Category } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineCopy } from "react-icons/ai";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumn = {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: Date;
  storeId?: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboardLabel",
    header: "Billboard",
    // cell: ({ row }) => row.original.billboardId,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue("createdAt");
      const formatted = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
      }).format(date as unknown as Date);

      return <div className=" font-medium">{formatted}</div>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;
      const router = useRouter();
      const { storeid } = useParams();

      const deleteHandler = async () => {
        try {
          //   setDeleting(true);
          const res = await fetch(
            `/api/store/${storeid}/categories/${category.id}`,
            {
              method: "DELETE",
            }
          );
          const data = await res.json();
          toast.success("deleted successfully");
          router.refresh();
        } catch (e) {
          toast.error("error deleting");
        } finally {
          // do something
          //   setDeleting(false);
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
              onClick={() => navigator.clipboard.writeText(category.id)}
            >
              <AiOutlineCopy /> Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center cursor-pointer gap-2"
              onClick={() => {
                router.push(`/${storeid}/categories/${category.id}`);
              }}
            >
              <AiOutlineEdit /> update
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex cursor-pointer items-center gap-2"
              onClick={deleteHandler}
            >
              <AiOutlineDelete /> delete
            </DropdownMenuItem>
          </DropdownMenuContent>
          {/* <ConfirmDialog id={deleteId} loading={deleting} /> */}
        </DropdownMenu>
      );
    },
  },
];
