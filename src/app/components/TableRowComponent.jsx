import React from "react";
import Link from "next/link";
import DeleteButton from "@/app/components/delete-button/DeleteButton";
import { TableCell, TableRow } from "@/components/ui/table";

const TableRowComponent = ({ client, t }) => (
  <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-500">
    <TableCell className="p-3 font-bold w-max">{client.name}</TableCell>
    <TableCell className="p-3 font-semibold">{client.email}</TableCell>
  <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-700">
    <TableCell className="p-3">{client.name}</TableCell>
    <TableCell className="p-3 hidden md:table-cell">{client.phone}</TableCell>
    <TableCell className="p-3">{client.email}</TableCell>
    <TableCell className="p-3">{client.source}</TableCell>
    <TableCell className="p-3">{client.source}</TableCell>
    <TableCell className="p-3 hidden md:table-cell">{client.DESC}</TableCell>
    <TableCell className="p-3 flex gap-3">
      <Link href={`leads/${client.id}`} className="px-4 py-2 bg-blue-600 text-white rounded-md">
        <span className="inline-block max-sm:hidden">{t("more_details")}</span>
        <span className="hidden max-sm:inline-block">{t("more")}</span>
      </Link>
      <DeleteButton handleDelete={() => console.log("delete")} />
    </TableCell>
  </TableRow>
);

export default TableRowComponent;
