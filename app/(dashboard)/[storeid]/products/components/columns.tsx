"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency } from "@/lib/utils";
import CellAction from "./cell-action";

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  isArchived: boolean;
  isFeatured: boolean;
  category: string;
  size: string;
  color: string;
  createdAt: Date;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const priceInCents = row.original.price;
      return <p>{formatCurrency(priceInCents)}</p>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => {
      const hexColor = row.original.color;
      return (
        <div
          className="w-[40px] h-[16px]"
          style={{
            backgroundColor: `${hexColor}`,
          }}
        ></div>
      );
    },
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
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
