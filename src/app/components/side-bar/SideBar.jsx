"use client";
import React, { useState } from "react";
import { links } from "./data";
import styles from "./SideBar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useTranslation } from "@/app/context/TranslationContext";
function SideBar() {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const isActive = (href) => {
    if (pathName.split("/").includes(href)) return true;
    if (pathName === "/dashboard" && href === "/") return true;
  };
  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="absolute z-40 top-5 left-0 -translate-x-1/2 flex justify-center items-center bg-white w-10 h-10 rounded-full text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <IoArrowBackCircleOutline className="text-2xl" />
      </button>
      <aside
        id="sidebar-multi-level-sidebar"
        className={`${styles.sidebar} ${
          isOpen ? styles.sidebarOpen : styles.sidebarClosed
        } h-screen bg-white dark:bg-gray-800`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800 border-x shadow-sm">
          <ul className="space-y-2 font-medium">
            <li className="logo">
              <Image
                width={50}
                height={50}
                alt="logo"
                src="/assets/logo/logo.webp"
                className="mx-auto"
              />
            </li>

            {links.map((item) => {
              return (
                <li key={item.id}>
                  <Link
                    type="button"
                    href={`/dashboard/${item.link}`}
                    className={`flex items-center w-full gap-3 ${
                      isOpen
                        ? "flex-row text-xl font-semibold"
                        : "flex-col justify-center items-center text-base font-medium"
                    } ${
                      isActive(item.link) &&
                      "bg-tea_green text-tea_green-200 hover:text-tea_green-100  hover:bg-tea_green-600 dark:bg-light_green dark:text-tea_green-100"
                    }  p-2 text-gray-900 transition duration-75 rounded-lg group dark:hover:text-tea_green-100 hover:bg-gray-100 dark:text-white dark:hover:bg-tea_green-700`}
                  >
                    <span>{item.icon()}</span>
                    <span className="flex-1 text-left rtl:text-right whitespace-nowrap">
                      {t(item.title)}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default SideBar;
