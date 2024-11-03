"use client";
import React, { useState } from "react";
import { links } from "./data.js";
import styles from "./SideBar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation.js";
function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const isActive = (href) => {
    if (pathName.split("/").includes(href) === href) return true;
  };
  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="absolute z-40  left-0 -translate-x-1/2 flex justify-center items-center ms-3 w-10 h-10 rounded-full text-sm text-gray-500   hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>
      <aside
        id="sidebar-multi-level-sidebar"
        className={`${styles.sidebar} ${
          isOpen ? styles.sidebarOpen : styles.sidebarClosed
        } h-screen bg-gray-50 dark:bg-gray-800`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li className="logo"></li>

            {links.map((item) => {
              return (
                <li key={item.id}>
                  <Link
                    type="button"
                    href={`/dashboard/${item.link}`}
                    className={`flex items-center w-full ${
                      isOpen ? "flex-row" : "flex-col"
                    } ${
                      isActive(item.link) && "bg-tea_green"
                    } p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                    aria-controls="dropdown-example"
                    data-collapse-toggle="dropdown-example"
                  >
                    <span>{item.icon()}</span>
                    <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                      {item.title}
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
