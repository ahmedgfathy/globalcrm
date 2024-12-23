import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableRowComponent from "./TableRowComponent";
import Filter from "./Filter";

const ClientTable = ({ clients, t, afterDel, onFilterChange, filterData, filterValues,handleFilterChange,selectedLeads, setSelectedLeads  }) => {

  return (
    <div
      className="w-full bg-Lightbg dark:bg-cardbgDark shadow rounded-lg overflow-hidden"
      dir="rtl"
    >
      <div
        className="filter p-3 bg-gray-100 dark:bg-gray-700 flex justify-between flex-col md:flex-row-reverse items-center rounded-t-lg"
        dir="ltr"
      >
        <Filter
          data={filterData}
          onFilterChange={handleFilterChange}
          filterChange={onFilterChange}
          filterValues={filterValues}
        />

      </div>
      <Table className="min-w-full text-start">
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-700">
            <TableHead className="min-w-fit text-nowrap p-3 text-start text-dark dark:text-white text-base font-bold">
              {t('check_lead')}
            </TableHead>
            <TableHead className="min-w-fit text-nowrap p-3 text-start text-dark dark:text-white text-base font-bold">
              {t("lead_no")}
            </TableHead>
            <TableHead className="min-w-fit text-nowrap p-3 text-start text-dark dark:text-white text-base font-bold">
              {t("name_client")}
            </TableHead>
            <TableHead className="min-w-fit text-nowrap p-3 text-start text-dark dark:text-white text-base font-bold ">
              {t("mobile_phone")}
            </TableHead>
            <TableHead className="min-w-fit text-nowrap p-3 text-start text-dark dark:text-white text-base font-bold ">
              {t("Assigned To")}
            </TableHead>
            <TableHead className="min-w-fit text-nowrap p-3 text-start text-dark dark:text-white text-base font-bold">
              {t("source")}
            </TableHead>
            <TableHead className="min-w-fit text-nowrap p-3 text-start text-dark dark:text-white text-base font-bold">
              {t("request_type")}
            </TableHead>
            <TableHead className="min-w-fit text-nowrap p-3 text-start text-dark dark:text-white text-base font-bold">
              {t("action")}
            </TableHead>
            {/* <TableHead className="min-w-fit text-nowrap p-3 text-end flex h-auto justify-around items-center">
              <DropdownMenImportExport t={t} handleExportCSV={()=>console.log("no thing")} handleImportCSV={()=>console.log("no thing")} searchUsersForTransform={searchUsersForTransform} users={users} />
             <DropdownMenImportExport t={t} handleExportCSV={handleExportCSV} handleImportCSV={handleImportCSV} searchUsersForTransform={searchUsersForTransform} users={users} />
            </TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRowComponent
              key={client.$id}
              client={client}
              t={t}
              afterDel={() => afterDel(1, "")}
              selectedLeads={selectedLeads}
              setSelectedLeads={setSelectedLeads}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientTable;
