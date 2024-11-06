"use client";
import { useTranslation } from "@/app/context/TranslationContext";

import Link from "next/link";
import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const ClientDetails = [
  { id: 1, name: "Ahmed", phone: "1 (123) 456-7890", source: "Ahmed", email: "Raymond@simmmple.com", DESC: "any" },
  { id: 2, name: "Ahmed", phone: "1 (123) 456-7890", source: "Ahmed", email: "Raymond@simmmple.com", DESC: "any" },
  { id: 3, name: "Ahmed", phone: "1 (123) 456-7890", source: "Ahmed", email: "Raymond@simmmple.com", DESC: "any" },
  { id: 4, name: "Ahmed", phone: "1 (123) 456-7890", source: "Ahmed", email: "Raymond@simmmple.com", DESC: "any" },
  { id: 5, name: "Ahmed", phone: "1 (123) 456-7890", source: "Ahmed", email: "Raymond@simmmple.com", DESC: "any" },
  { id: 6, name: "Ahmed", phone: "1 (123) 456-7890", source: "Ahmed", email: "Raymond@simmmple.com", DESC: "any" },
  { id: 7, name: "Ahmed", phone: "1 (123) 456-7890", source: "Ahmed", email: "Raymond@simmmple.com", DESC: "any" },
  { id: 8, name: "Ahmed", phone: "1 (123) 456-7890", source: "Ahmed", email: "Raymond@simmmple.com", DESC: "any" },
  { id: 9, name: "Ahmed", phone: "1 (123) 456-7890", source: "Ahmed", email: "Raymond@simmmple.com", DESC: "any" },
  { id: 10, name: "Ahmed", phone: "1 (123) 456-7890", source: "Ahmed", email: "Raymond@simmmple.com", DESC: "any" },
  { id: 11, name: "Ahmed", phone: "1 (123) 456-7890", source: "Ahmed", email: "Raymond@simmmple.com", DESC: "any" },
  { id: 12, name: "Ahmed", phone: "1 (123) 456-7890", source: "Ahmed", email: "Raymond@simmmple.com", DESC: "any" },
  { id: 13, name: "Ahmed", phone: "1 (123) 456-7890", source: "Ahmed", email: "Raymond@simmmple.com", DESC: "any" },
  { id: 14, name: "Ahmed", phone: "1 (123) 456-7890", source: "Ahmed", email: "Raymond@simmmple.com", DESC: "any" },
  { id: 15, name: "Ahmed", phone: "1 (123) 456-7890", source: "Ahmed", email: "Raymond@simmmple.com", DESC: "any" },
  { id: 16, name: "Ahmed", phone: "1 (123) 456-7890", source: "Ahmed", email: "Raymond@simmmple.com", DESC: "any" },
  { id: 17, name: "Ahmed", phone: "1 (123) 456-7890", source: "Ahmed", email: "Raymond@simmmple.com", DESC: "any" },
  { id: 18, name: "Ahmed", phone: "1 (123) 456-7890", source: "Ahmed", email: "Raymond@simmmple.com", DESC: "any" },
  { id: 19, name: "Ahmed", phone: "1 (123) 456-7890", source: "Ahmed", email: "Raymond@simmmple.com", DESC: "any" },
];

function Page() {
  const { t } = useTranslation();
  return (
    <div className="py-2 h-screen">
      <div className="w-full flex flex-wrap justify-between items-start gap-3 max-md:gap-7 px-4 pt-2">
        <div className="w-full h-[60px] max-[450px]:h-max flex items-center pl-10 max-[450px]:mx-auto max-[450px]:pl-0 pb-5">
          <p className="text-4xl text-black dark:text-white font-bold">{t("leads_List")}</p>
        </div>
        <Table className="w-full min-w-[700px] overflow-x-auto h-full min-h-max bg-transparent dark:bg-cardbgDark border-2 border-borderSearchInputLight dark:border-borderSearchInputDark dark:focus:border-white focus:outline-none rounded-md px-5">
          <TableHeader>
            <TableRow >
              <TableHead class="w-[20%] text-start">{t("name_client")}</TableHead>
              <TableHead>{t("email")}</TableHead>
              <TableHead>{t("mobile_phone")}</TableHead>
              <TableHead className="text-center">{t("source")}</TableHead>
              <TableHead className="text-center">{t("DESC")}</TableHead>
              <TableHead className="w-max">action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ClientDetails.map((ele) => (
              <TableRow key={ele.id} className="border-t-[1px] space-y-3">
                <TableCell>{ele.name}</TableCell>
                <TableCell>{ele.email}</TableCell>
                <TableCell>{ele.phone}</TableCell>
                <TableCell>{ele.source}</TableCell>
                <TableCell>{ele.DESC}</TableCell>
                <TableCell>
                  <Link href={`leads/${ele.id}`} className="GreenButton dark px-4 h-max w-max">more details</Link>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>

            </TableRow>
            {/* Add more rows here as needed */}
          </TableBody>
        </Table>
        <div className="footer"></div>
      </div>
    </div>
  );
}

export default Page;
