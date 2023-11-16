"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Billboard } from "@prisma/client";
import CellAction from "./cell-action";

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
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
