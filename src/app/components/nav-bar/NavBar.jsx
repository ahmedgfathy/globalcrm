"use client";
import React from "react";
import Drawer from "../Drawer/Drawer";
import Menu from "../menu/Menu";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/app/context/TranslationContext";
import { data } from "./data";
import Link from "next/link";

function NavBar() {
  const pathName = usePathname();
  const { t } = useTranslation();

  return (
    <nav
      className="fixed top-0 right-[90px] left-0 p-7 bg-white dark:bg-gray-900"
      style={{
        zIndex: "200",
        backgroundColor: pathName === "/login" ? "transparent" : undefined,
      }}
      dir="ltr"
    >
      <div className="pr-8"> {/* Added right padding */}
        <div className="flex items-center h-10">
            {pathName !== "/login" && pathName !== "/" ? (
      <>
          <div className="avatar">
              <Menu />
              </div>
              <div className="setting mx-3">
            <Drawer />
          </div>
          </>
          ): null}
          {pathName !== "/login" && pathName !== "/" ? (
            <div className="links mx-auto md:ml-auto md:mr-0">
              <ul className="flex justify-evenly gap-3 md:mr-32 ">
                {data.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/${item.link}`}
                      className="flex items-center w-full gap-3 p-2 transition duration-100 rounded-lg group flex-row text-xl font-semibold bg-dark_link_active dark:bg-dark_link_active text-text_link_active_l dark:text-text_link_active"
                    >
                      <span>{item.icon()}</span>
                      <span className="flex-1 text-left rtl:text-right whitespace-nowrap hidden sm:inline">
                        {t(item.title)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
