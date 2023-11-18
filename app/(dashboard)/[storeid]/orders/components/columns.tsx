"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { Order } from "@prisma/client";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "name",
    header: "Products",
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
      const value = row.getValue("value");

      return (
        <div className=" font-medium flex items-center gap-2">
          <p>{value as string}</p>
          <div
            className={`w-3 h-3 `}
            style={{
              backgroundColor: `${value}`,
            }}
          ></div>
        </div>
      );
    },
  },
  {
    accessorKey: "isPaid",
    header: "isPaid",
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
];
