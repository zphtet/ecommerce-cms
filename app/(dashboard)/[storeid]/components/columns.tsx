"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Billboard } from "@prisma/client";
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
import ConfirmDialog from "./confirm-dialog";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Billboard>[] = [
  {
    accessorKey: "label",
    header: "Label",
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
      const billboard = row.original;
      const router = useRouter();
      //   const [deleting, setDeleting] = useState(false);
      //   const [deleteId, setDeleteId] = useState("");

      const deleteHandler = async () => {
        try {
          //   setDeleting(true);
          const res = await fetch(`/api/billboard/${billboard.id}`, {
            method: "DELETE",
          });
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
      //   const showConfirmDelete = () => {
      //     console.log("show id", billboard.id);
      //     setDeleteId(billboard.id);
      //     document.getElementById("confirm-delete")?.click();
      //   };
      //   console.log("row render", billboard.id);
      //   useEffect(() => {
      //     if (deleteId) {
      //       const actionBtn = document.getElementById("action-btn");
      //       actionBtn?.setAttribute("data-deleteId", deleteId);
      //     }
      //   }, [deleteId]);
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
              onClick={() => navigator.clipboard.writeText(billboard.id)}
            >
              <AiOutlineCopy /> Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center cursor-pointer gap-2"
              onClick={() => {
                router.push(`/${billboard.storeId}/billboards/${billboard.id}`);
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
