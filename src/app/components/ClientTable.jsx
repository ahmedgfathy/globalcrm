import React from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TableRowComponent from "./TableRowComponent";

const ClientTable = ({ clients, t, afterDel }) => {
  // Lead No - Name - Mobile - Status - Source - Request - {Actions}
  return (
    <Table className="min-w-full text-start" >
      <TableHeader>
        <TableRow className="bg-gray-100 dark:bg-gray-700">
          <TableHead className="p-3 text-start">{t("lead_no")}</TableHead>
          <TableHead className="p-3 text-start">{t("name_client")}</TableHead>
          <TableHead className="p-3 text-start hidden md:table-cell">{t("mobile_phone")}</TableHead>
          <TableHead className="p-3 hidden md:table-cell text-start">{t("status")}</TableHead>
          <TableHead className="p-3 text-start">{t("source")}</TableHead>
          <TableHead className="p-3 text-start">{t("request_type")}</TableHead>
          {/* <TableHead className="p-3 text-start">{t("class")}</TableHead> */}
          <TableHead className="p-3 text-start">{t("action")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRowComponent key={client.$id} client={client} t={t} afterDel={afterDel} />
        ))}
      </TableBody>
    </Table>
  );
};

export default ClientTable;
