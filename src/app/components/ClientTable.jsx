import React from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TableRowComponent from "./TableRowComponent";

const ClientTable = ({ clients, t }) => {
  return (
    <Table className="min-w-full text-start" >
      <TableHeader>
        <TableRow className="bg-gray-100 dark:bg-gray-700">
          <TableHead className="p-3 text-start font-bold">{t("name_client")}</TableHead>
          <TableHead className="p-3 text-start font-bold">{t("email")}</TableHead>
          <TableHead className="p-3 text-start font-bold hidden md:table-cell">{t("mobile_phone")}</TableHead>
          <TableHead className="p-3 text-start font-bold">{t("source")}</TableHead>
          <TableHead className="p-3 hidden md:table-cell text-start font-bold">{t("DESC")}</TableHead>
          <TableHead className="p-3 text-start max-md:text-center font-bold">{t("action")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRowComponent key={client.id} client={client} t={t} />
        ))}
      </TableBody>
    </Table>
  );
};

export default ClientTable;
