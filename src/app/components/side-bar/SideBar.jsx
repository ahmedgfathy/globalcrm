"use client";
import React, { useEffect, useState, useRef } from "react";
import { links } from "./data";
import styles from "./SideBar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useTranslation } from "@/app/context/TranslationContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { CiMenuFries } from "react-icons/ci";

function SideBar() {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const sidebarRef = useRef(null);

  const isActive = (href) => {
    if (pathName.split("/").includes(href)) return true;
    if (pathName === "/dashboard" && href === "/") return true;
  };


  useEffect(() => {
    if (isMobile) {
      const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
    const handleClickOutside = (event) => {
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile]);

  return (
    <div className="relative z-50">
      {isMobile ? (
        !isOpen && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-controls="sidebar-multi-level-sidebar"
            type="button"
            className={`fixed  z-40 top-5 translate-x-1/2 flex  justify-center items-center rounded-full w-10 h-10 text-sm text-gray-500 dark:text-white ${
              isOpen ? "right-[16rem]" : "right-4"
            }`}
          >
            <span className="sr-only">Open sidebar</span>
            <CiMenuFries className="text-2xl" />
          </button>
        )
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="sidebar-multi-level-sidebar"
          type="button"
          className={`fixed duration-200 z-40 top-5 ${
            isOpen ? "right-[16rem]" : "right-[10rem]"
          } translate-x-1/2 flex justify-center items-center bg-white dark:bg-gray-600 w-10 h-10 rounded-full text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
        >
          <span className="sr-only">Open sidebar</span>
          <IoArrowBackCircleOutline className="text-2xl" />
        </button>
      )}

      {(isOpen || !isMobile) && (
        <aside
          ref={sidebarRef}
          id="sidebar-multi-level-sidebar"
          className={`${styles.sidebar} ${
            isOpen
              ? !isMobile
                ? styles.sidebarOpen
                : "w-0"
              : styles.sidebarClosed
          } h-screen bg-white dark:bg-dark`}
          aria-label="Sidebar"
        >
          <div
            className={`h-full px-3 py-4 overflow-y-auto bg-white dark:bg-dark border-x shadow-sm fixed right-0 ${
              styles.sidebar
            } ${isOpen ? styles.sidebarOpen : styles.sidebarClosed} `}
          >
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

              {links.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/${item.link}`}
                    className={`flex items-center w-full gap-3 p-2 text-gray-900 transition duration-100 rounded-lg group ${
                      isOpen
                        ? "flex-row text-xl font-semibold"
                        : "flex-col justify-center items-center text-base font-medium"
                    } ${
                      isActive(item.link)
                        ? "bg-dark_link_active dark:bg-dark_link_active text-text_link_active_l dark:text-text_link_active"
                        : "hover:bg-gray-200 dark:text-gray-400 dark:hover:text-gray-500"
                    }`}
                  >
                    <span>{item.icon()}</span>
                    <span className="flex-1 text-left rtl:text-right whitespace-nowrap">
                      {t(item.title)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </div>
  );
}

export default SideBar;
