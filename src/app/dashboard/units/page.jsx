"use client"
import { Box, Grid } from '@mui/material'
import React from 'react'
import UnitsTable from "../../../components/ui/tables"
import { useTranslation } from '@/app/context/TranslationContext';
import Link from 'next/link';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { FaWhatsapp } from 'react-icons/fa6';
import { MdOutlineMail } from 'react-icons/md';
export default function page() {
  let t = useTranslation
  return (
    <div className="py-2">

      <Grid container className="p-6 w-full">
        <Grid item className="flex gap-5 w-full ">
          <input
            type="text"
            className=" bg-white  bg-Lightbg dark:bg-cardbgDark border border-[1px] hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md p-2 max-[450px]:py-1"
            style={{ borderColor: '#ccc', flexGrow: "1" }}

            placeholder={`${t("search_client")} ...`}
          />
          <Link
            href="/dashboard/leads/add-lead"
            className="GreenButton dark md:w-[130px]  flex justify-between rounded items-center gap-1"
            style={{ borderRadius: "3px" }}
          >
            <AiOutlineUserAdd className="text-xl" /> {t("add_lead")}
          </Link>

        </Grid>
      </Grid>
      <Grid container className="flex gap-5 justify-between p-6" style={{ flexWrap: "wrap" }} >
        {ClientDetails.map((ele) => (
          <Grid item xs={12} sm={5.7} lg={2.8} key={ele.id}>
            <div
              key={ele.id}
              className="rounded-t max-h-max hover:shadow duration-300 bg-Lightbg dark:bg-cardbgDark flex flex-col justify-between items-center gap-4 rounded-b "
            >
              <div className="overflow-hidden w-full lg:h-[200px] sm:h-[230px]">
                <img
                  className="rounded-t block bg-cover w-full h-full hover:scale-105 duration-500"
                  src={ele.href}
                  alt="Bold typography"
                />
              </div>
              <div className="w-full h-max flex flex-col justify-center items-start gap-2 p-3">
                <p className="font-bold text-sm capitalize">
                  {t("name")} : {ele.name}
                </p>
                <p className="font-bold text-xs capitalize">
                  {t("mobile_phone")}: {ele.phone}
                </p>
              </div>

              <div className="w-full flex justify-between items-center p-3">
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border rounded border-gray-400 shadow">
                  {t("more_details")}
                </button>

                <div className="flex justify-start items-center gap-2">
                  <Link href="">
                    <FaWhatsapp className="text-[#08521d] text-xl dark:text-white hover:scale-125 duration-300" />
                  </Link>
                  <Link href="">
                    <FiPhoneCall className="text-[#08521d] dark:text-white text-xl hover:scale-125 duration-300" />
                  </Link>
                  <Link href="">
                    <MdOutlineMail className="text-[#08521d] dark:text-white text-xl hover:scale-125 duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          </Grid>

        ))}

      </Grid>



      <div className="footer"></div>
    </div>
  );
}
