"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Order } from "@prisma/client";
import { formatCurrency } from "@/lib/utils";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "OrderId",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },

  {
    accessorKey: "price",
    header: "TotalPrice",
    cell: ({ row }) => {
      const value = formatCurrency(row.original.price || "0");
      return (
        <div className=" font-medium flex items-center gap-2">{value}</div>
      );
    },
  },
  {
    accessorKey: "isPaid",
    header: "isPaid",
  },
];
