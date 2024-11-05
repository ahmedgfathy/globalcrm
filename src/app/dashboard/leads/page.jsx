"use client";
import { useTranslation } from "@/app/context/TranslationContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUserAdd,
  AiOutlineWhatsApp,
} from "react-icons/ai";

const ClientDetails = [
  { id: 1, name: "Ahmed", phone: "01011001105", href: "" },
  { id: 2, name: "ALi", phone: "01011424232", href: "" },
  { id: 3, name: "Khalid", phone: "01014303103", href: "" },
  { id: 4, name: "Khalid", phone: "01014303103", href: "" },
  { id: 5, name: "Khalid", phone: "01014303103", href: "" },
  { id: 6, name: "Khalid", phone: "01014303103", href: "" },
  { id: 7, name: "Khalid", phone: "01014303103", href: "" },
  { id: 8, name: "Khalid", phone: "01014303103", href: "" },
  { id: 9, name: "Khalid", phone: "01014303103", href: "" },
  { id: 10, name: "Khalid", phone: "01014303103", href: "" },
  { id: 11, name: "Khalid", phone: "01014303103", href: "" },
  { id: 12, name: "Khalid", phone: "01014303103", href: "" },
  { id: 13, name: "Khalid", phone: "01014303103", href: "" },
  { id: 14, name: "Khalid", phone: "01014303103", href: "" },
  { id: 15, name: "Khalid", phone: "01014303103", href: "" },
  { id: 16, name: "Khalid", phone: "01014303103", href: "" },
  { id: 17, name: "Khalid", phone: "01014303103", href: "" },
  { id: 18, name: "Khalid", phone: "01014303103", href: "" },
  { id: 19, name: "Khalid", phone: "01014303103", href: "" },
  { id: 20, name: "Khalid", phone: "01014303103", href: "" },
];

function Page() {
  const { t } = useTranslation();
  return (
    <div className="py-2">
      <div className="w-full flex flex-wrap justify-between items-start gap-3 max-md:gap-7 px-2 pt-2 max-[1200px]:px-7">
        <div className="bg-[#FFF] dark:bg-[#222831] rounded-xl w-full h-[50px] max-[450px]:h-max max-[450px]:py-2 flex max-[450px]:flex-wrap justify-between max-[450px]:justify-center items-center mb-5 max-[450px]:mb-0 gap-3 px-3">
          <div className="w-3/4 max-[450px]:w-full shadow-box_shadow rounded-xl">
            <input
              type="text"
              className="w-full max-[450px]:w-full rounded-lg border-transparent bg-[#eaeaea] dark:bg-[#222831] focus:outline-none p-2 max-[450px]:py-1"
              placeholder={`${t("search_client")} ...`}
            />
          </div>
          <div className="w-max max-[450px]:w-full">
            <Link
              href="/dashboard/leads/add-lead"
              className="w-max text-sm max-[450px]:text-xs mx-auto px-4 py-2 max-[450px]:p-2 font-bold rounded-xl  duration-200 text-[#0fa439] hover:text-[#08521d] bg-[#c8fad6] dark:text-white dark:hover:text-[#08521d] dark:bg-[#5be49b] dark:hover:bg-[#ddfce6] capitalize flex justify-between items-center gap-1"
            >
              <AiOutlineUserAdd /> {t("add_lead")}
            </Link>
          </div>
        </div>
        <div className="w-full gap-2 gap-y-5 max-lg:gap-2 max-lg:gap-y-5 px-5 max-lg:px-2 grid grid-cols-5 max-lg:grid-cols-5 max-sm:grid-cols-2 max-[300px]:grid-cols-1">
          {ClientDetails.map((ele) => (
            <div
              key={ele.id}
              className="max-lg:h-[380px] max-sm:h-[300px] max-h-max flex flex-col justify-between items-center gap-4  rounded-2xl px-2 py-6 shadow-box_shadow hover:scale-105 duration-500 bg-[#FFF] dark:bg-[#222831] "
            >
              <div className="overflow-hidden w-full h-[140px]">
                <img
                  className="block bg-cover w-full h-full rounded-xl hover:scale-125 duration-500"
                  src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                  alt="Bold typography"
                />
              </div>
              <div className="w-full h-max flex flex-col justify-center items-start gap-2">
                <p className="font-bold text-sm capitalize">
                  {t("name")}: {ele.name}
                </p>
                <p className="font-bold text-xs capitalize">
                  {t("mobile_phone")}: {ele.phone}
                </p>
              </div>
              <div className="w-full flex justify-start items-center gap-2">
                <Link href="">
                  <AiOutlineWhatsApp className="text-[#08521d] dark:text-white  hover:scale-125 duration-300" />
                </Link>
                <Link href="">
                  <AiOutlineMail className="text-[#08521d] dark:text-white  hover:scale-125 duration-300" />
                </Link>
                <Link href="">
                  <AiOutlinePhone className="text-[#08521d] dark:text-white  hover:scale-125 duration-300" />
                </Link>
                <Link href="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 52 52"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="text-[#08521d] dark:text-white  hover:scale-125 duration-300"
                  >
                    <path
                      d="m9.9 27.41a4.29 4.29 0 0 1 4.29 4.29v.38a4.47 4.47 0 0 1 -1.42 3.35 2.48 2.48 0 0 0 -.94 1.81c0 .58.24 1.16 1.5 1.81l1.29.58c1.81.89 3.39 1.81 3.44 3.62a2.39 2.39 0 0 1 -2.06 2.27h-11.95a2.39 2.39 0 0 1 -2.3-2.45c0-1.72 1.59-2.73 3.44-3.62l.67-.29.33-.16c1.57-.65 1.81-1.22 1.81-1.8a2.73 2.73 0 0 0 -.94-1.81 4.46 4.46 0 0 1 -1.42-3.39 4.3 4.3 0 0 1 3.94-4.62zm36.23-19.93a3.62 3.62 0 0 1 3.62 3.62v27.17a3.63 3.63 0 0 1 -3.62 3.63h-25.49a5.43 5.43 0 0 0 -2.64-3.63h27.15a.9.9 0 0 0 .9-.9v-23.55a.9.9 0 0 0 -.9-.9h-36.23a.9.9 0 0 0 -.9.9h-.02v11.09a6.51 6.51 0 0 0 -3.63 2.37v-16.18a3.63 3.63 0 0 1 3.63-3.62z"
                      fillRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
              <div className="w-full flex justify-between items-center">
                <Link
                  href={`/dashboard/leads/${ele.id}`}
                  className="text-sm max-[450px]:text-xs mx-auto px-4 py-2 max-[450px]:p-2 font-bold rounded-xl hover:scale-105 duration-200 text-[#0fa439] hover:text-[#08521d] bg-[#c8fad6] dark:text-white dark:hover:text-[#08521d] dark:bg-[#5be49b] dark:hover:bg-[#ddfce6] capitalize"
                >
                  {t("button_to_client")}
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="footer"></div>
      </div>
    </div>
  );
}

export default Page;
