"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DeleteButton from "@/app/components/delete-button/DeleteButton";
import { TableCell, TableRow } from "@/components/ui/table";
import { deleteLead } from "../../actions/leadsAction";
import { Checkbox } from "@/components/ui/checkbox";

const TableRowComponent = ({ client, t, afterDel, selectedLeads, setSelectedLeads }) => {
  const router = useRouter();

  const handleCheckboxChange = (checked) => {
    setSelectedLeads((prev) =>
      checked
        ? [...prev, client.$id] 
        : prev.filter((id) => id !== client.$id)  
    );
  };
  

  const handleRowClick = (e) => {
    if (e.target.closest(".prevent-row-click")) {
      return;
    }
    router.push(`/leads/${client.$id}`);
  };

  return (
    <TableRow
      className="hover:bg-gray-50 dark:hover:bg-gray-700 hover:cursor-pointer"
      onClick={handleRowClick}
    >
      <TableCell className="p-3 text-center">
      <Checkbox  className="prevent-row-click" onCheckedChange={(checked)=>handleCheckboxChange(checked)} checked={selectedLeads.includes(client.$id)} />
        {/* <input
          type="checkbox"
          className="prevent-row-click"
          onChange={handleCheckboxChange}
          checked={selectedLeads.includes(client.$id)}
        /> */}
      </TableCell>

      <TableCell className="p-3 text-base font-semibold">{client.leadNumber}</TableCell>
      <TableCell className="p-3 text-base font-semibold">{client.name}</TableCell>
      <TableCell className="p-3 text-base font-semibold">{client.number}</TableCell>
      <TableCell className="p-3 text-base font-semibold">{client.assignedTo}</TableCell>
      <TableCell className="p-3 text-base font-semibold">{client.customerSource}</TableCell>
      <TableCell className="p-3 text-base font-semibold">{client.type}</TableCell>

      <TableCell className="p-3 flex gap-3">
        <Link
          href={`leads/${client.$id}`}
          className="px-4 py-2 bg-yale_blue-700 text-white rounded-md"
        >
          <span className="inline-block max-sm:hidden">{t("more_details")}</span>
          <span className="hidden max-sm:inline-block">{t("more")}</span>
        </Link>
        <DeleteButton
          handleDelete={async (e) => {
            await deleteLead(client.$id);
          }}
          afterDel={afterDel}
          className="prevent-row-click"
        />
      </TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
