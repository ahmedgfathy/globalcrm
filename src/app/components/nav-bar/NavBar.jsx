"use client";
import React from "react";
import Drawer from "../Drawer/Drawer";
import Menu from "../menu/Menu";
import { usePathname } from "next/navigation";
// import { data } from "./data";
// import Link from "next/link";
import { useTranslation } from "@/app/context/TranslationContext";

function NavBar() {
  const pathName = usePathname();
  const { t } = useTranslation();
  return (
    <nav className="fixed top-0 left-0 right-0 menu-drawer 10" dir="ltr">
      <div className="">
        <div className="flex items-center h-10">
          {/* {pathName.split("/").includes("dashboard") && ( */}
          <div className="avatar mx-5">
            <Menu />
          </div>
          {/* )} */}
          <div className="setting  ">
            <Drawer />
          </div>
          <div className="links">
            <ul className="flex">
              {/* {data.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/${item.link}`}
                    className={`flex items-center w-full gap-3 p-2  transition duration-100 rounded-lg group 
                      
                        flex-row text-xl font-semibold
                    `}
                  >
                    <span>{item.icon()}</span>
                    <span className="flex-1 text-left rtl:text-right whitespace-nowrap">
                      {t(item.title)}
                    </span>
                  </Link>
                </li>
              ))} */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
