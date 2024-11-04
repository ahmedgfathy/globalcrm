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
  const { t, locale } = useTranslation();
  const [isOpen, setIsOpen] = useState(!isMobile);
  const pathName = usePathname();
  const sidebarRef = useRef(null);

  const isActive = (href) => {
    if (pathName.split("/").includes(href)) return true;
    if (pathName === "/dashboard" && href === "/") return true;
  };

  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

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
  }, [isMobile]);

  return (
    <div className="relative z-50">
      {isMobile ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="sidebar-multi-level-sidebar"
          type="button"
          className="absolute duration-200 z-40 top-5 -left-5 -translate-x-1/2 flex justify-center items-center w-10 h-10 text-sm text-gray-500  "
        >
          <span className="sr-only">Open sidebar</span>
          <CiMenuFries className="text-2xl" />
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="sidebar-multi-level-sidebar"
          type="button"
          className="absolute duration-200 z-40 top-5 left-0 -translate-x-1/2 flex justify-center items-center bg-white dark:bg-gray-600 w-10 h-10 rounded-full text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
            isOpen ? styles.sidebarOpen : styles.sidebarClosed
          } h-screen bg-white dark:bg-gray-800`}
          aria-label="Sidebar"
          dir={locale === "ar" ? "rtl" : "ltr"}
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-dark border-x shadow-sm">
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
                    href={`/dashboard/${item.link}`}
                    className={`flex items-center w-full gap-3 ${
                      isOpen
                        ? "flex-row text-xl font-semibold"
                        : "flex-col justify-center items-center text-base font-medium"
                    } ${
                      isActive(item.link) &&
                      "bg-tea_green text-tea_green-200 hover:text-tea_green-100 hover:bg-tea_green-600 dark:bg-light_green dark:text-tea_green-100"
                    } p-2 text-gray-900 transition duration-75 rounded-lg group dark:hover:text-tea_green-100 hover:bg-gray-100 dark:text-white dark:hover:bg-tea_green-700`}
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
