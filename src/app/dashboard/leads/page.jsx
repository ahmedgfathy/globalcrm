"use client";
import { useTranslation } from "@/app/context/TranslationContext";
import Link from "next/link";
import React from "react";
import { Pagination } from "antd";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import DeleteButton from "@/app/components/delete-button/DeleteButton";

const ClientDetails = [
  {
    id: 1,
    name: "Ahmed",
    phone: "1 (123) 456-7890",
    source: "Ahmed",
    email: "Raymond@simmmple.com",
    DESC: "any",
  },
  {
    id: 2,
    name: "Ahmed",
    phone: "1 (123) 456-7890",
    source: "Ahmed",
    email: "Raymond@simmmple.com",
    DESC: "any",
  },
  {
    id: 3,
    name: "Ahmed",
    phone: "1 (123) 456-7890",
    source: "Ahmed",
    email: "Raymond@simmmple.com",
    DESC: "any",
  },
  {
    id: 4,
    name: "Ahmed",
    phone: "1 (123) 456-7890",
    source: "Ahmed",
    email: "Raymond@simmmple.com",
    DESC: "any",
  },
  {
    id: 5,
    name: "Ahmed",
    phone: "1 (123) 456-7890",
    source: "Ahmed",
    email: "Raymond@simmmple.com",
    DESC: "any",
  },
  {
    id: 6,
    name: "Ahmed",
    phone: "1 (123) 456-7890",
    source: "Ahmed",
    email: "Raymond@simmmple.com",
    DESC: "any",
  },
  {
    id: 7,
    name: "Ahmed",
    phone: "1 (123) 456-7890",
    source: "Ahmed",
    email: "Raymond@simmmple.com",
    DESC: "any",
  },
  {
    id: 8,
    name: "Ahmed",
    phone: "1 (123) 456-7890",
    source: "Ahmed",
    email: "Raymond@simmmple.com",
    DESC: "any",
  },
  {
    id: 9,
    name: "Ahmed",
    phone: "1 (123) 456-7890",
    source: "Ahmed",
    email: "Raymond@simmmple.com",
    DESC: "any",
  },
  {
    id: 10,
    name: "Ahmed",
    phone: "1 (123) 456-7890",
    source: "Ahmed",
    email: "Raymond@simmmple.com",
    DESC: "any",
  },
  {
    id: 11,
    name: "Ahmed",
    phone: "1 (123) 456-7890",
    source: "Ahmed",
    email: "Raymond@simmmple.com",
    DESC: "any",
  },
  {
    id: 12,
    name: "Ahmed",
    phone: "1 (123) 456-7890",
    source: "Ahmed",
    email: "Raymond@simmmple.com",
    DESC: "any",
  },
  {
    id: 13,
    name: "Ahmed",
    phone: "1 (123) 456-7890",
    source: "Ahmed",
    email: "Raymond@simmmple.com",
    DESC: "any",
  },
  {
    id: 14,
    name: "Ahmed",
    phone: "1 (123) 456-7890",
    source: "Ahmed",
    email: "Raymond@simmmple.com",
    DESC: "any",
  },
  {
    id: 15,
    name: "Ahmed",
    phone: "1 (123) 456-7890",
    source: "Ahmed",
    email: "Raymond@simmmple.com",
    DESC: "any",
  },
  {
    id: 16,
    name: "Ahmed",
    phone: "1 (123) 456-7890",
    source: "Ahmed",
    email: "Raymond@simmmple.com",
    DESC: "any",
  },
  {
    id: 17,
    name: "Ahmed",
    phone: "1 (123) 456-7890",
    source: "Ahmed",
    email: "Raymond@simmmple.com",
    DESC: "any",
  },
  {
    id: 18,
    name: "Ahmed",
    phone: "1 (123) 456-7890",
    source: "Ahmed",
    email: "Raymond@simmmple.com",
    DESC: "any",
  },
  {
    id: 19,
    name: "Ahmed",
    phone: "1 (123) 456-7890",
    source: "Ahmed",
    email: "Raymond@simmmple.com",
    DESC: "any",
  },
];

function Page() {
  const { t } = useTranslation();
  return (
    <div className="py-6 min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {t("leads_List")}
          </h1>
          <Button>
            <Link href="/dashboard/leads/add-lead" className="w-full h-full">
              {t("add_lead")}
            </Link>
          </Button>
        </div>

        <div className="menu-drawer w-full bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <Table className="min-w-full text-start">
            <TableHeader>
              <TableRow className="bg-gray-100 dark:bg-gray-700">
                <TableHead className="p-3 text-start">{t("name_client")}</TableHead>
                <TableHead className="p-3 text-start">{t("email")}</TableHead>
                <TableHead className="p-3 text-start hidden md:table-cell">
                  {t("mobile_phone")}
                </TableHead>
                <TableHead className="p-3 text-start">{t("source")}</TableHead>
                <TableHead className="p-3 hidden md:table-cell text-start">
                  {t("DESC")}
                </TableHead>
                <TableHead className="p-3 text-start">{t("action")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ClientDetails.map((ele) => (
                <TableRow key={ele.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <TableCell className="p-3">{ele.name}</TableCell>
                  <TableCell className="p-3">{ele.email}</TableCell>
                  <TableCell className="p-3 hidden md:table-cell">{ele.phone}</TableCell>
                  <TableCell className="p-3">{ele.source}</TableCell>
                  <TableCell className="p-3 hidden md:table-cell">{ele.DESC}</TableCell>
                  <TableCell className="p-3 flex gap-3">
                    <Link href={`leads/${ele.id}`} className="px-4 py-2 bg-blue-600 text-white rounded-md">
                      {t("more_details")}
                    </Link>
                    <DeleteButton
                      handleDelete={() => {
                        console.log("delete");
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-center mt-4">
          <Pagination
            className="dark:bg-gray-800 px-3 py-2 rounded-md"
            defaultCurrent={1}
            total={500}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
