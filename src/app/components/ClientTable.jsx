import React from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TableRowComponent from "./TableRowComponent";
import { IoMdAddCircle } from "react-icons/io";
import CustomButton from "@/app/components/CustomButton";
import Filter from "./Filter";
import { DropdownMenImportExport } from "./leadImport-Export/ImportExport";

const ClientTable = ({ clients, t, afterDel, onAddLead, filterData }) => {
  return (
    <div className="w-full bg-Lightbg dark:bg-cardbgDark shadow rounded-lg overflow-hidden" dir="rtl">
      <div className="filter p-3 bg-gray-100 dark:bg-gray-700 flex justify-end items-center rounded-t-lg" dir="ltr">
        <Filter data={filterData} />
      </div>
      <Table className="min-w-full text-start">
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-700">
            <TableHead className=" min-w-fit text-nowrap p-3 text-start">{t("lead_no")}</TableHead>
            <TableHead className=" min-w-fit text-nowrap p-3 text-start">{t("name_client")}</TableHead>
            <TableHead className=" min-w-fit text-nowrap p-3 text-start hidden md:table-cell">{t("mobile_phone")}</TableHead>
            <TableHead className=" min-w-fit text-nowrap p-3 hidden md:table-cell text-start">{t("status")}</TableHead>
            <TableHead className=" min-w-fit text-nowrap p-3 text-start">{t("source")}</TableHead>
            <TableHead className=" min-w-fit text-nowrap p-3 text-start">{t("request_type")}</TableHead>
            <TableHead className=" min-w-fit text-nowrap p-3 text-start">{t("action")}</TableHead>
            <TableHead className=" min-w-fit text-nowrap p-3 text-end flex h-auto justify-around  items-center">
            <CustomButton
              fun={onAddLead}
              title={t("add_lead")}
              icon={() => <IoMdAddCircle />}
            />
             <DropdownMenImportExport />
          </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRowComponent key={client.$id} client={client} t={t} afterDel={afterDel} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientTable;
