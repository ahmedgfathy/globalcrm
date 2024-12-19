"use client";
import React, { useEffect, useState, useRef, useContext } from "react";
import { links } from "./data";
import styles from "./SideBar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useTranslation } from "@/app/context/TranslationContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { CiMenuFries } from "react-icons/ci";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserContext } from "@/app/context/UserContext";

function SideBar() {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [state] = useContext(UserContext)
  const pathName = usePathname();
  const sidebarRef = useRef(null);

  const isActive = (href) => {
    if (pathName.split("/").includes(href)) return true;
    if (pathName === "/dashboard" && href === "/") return true;
  };

  const isExpanded = isOpen || !isMobile;

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

  const renderNavLink = (item) => {
    const linkContent = (
      <div className="flex items-center gap-3 w-full text-right">
        <span className="order-2 text-2xl">
          {item.icon()}
        </span>
        <span className="flex-1 whitespace-nowrap text-right">
          {item.displayTitle}
        </span>
      </div>
    );

    return (
      <Link
        href={`/${item.link}`}
        onClick={() => isMobile && setIsOpen(false)}
        className={`flex items-center w-full p-1 text-gray-900 dark:text-gray-200 transition duration-100 rounded-lg group 
          ${isExpanded ? "text-xl font-semibold" : "text-base font-medium justify-center"}
          ${isActive(item.link)
            ? "bg-dark_link_active dark:bg-dark_link_active text-text_link_active_l dark:text-text_link_active"
            : "hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
      >
        {linkContent}
      </Link>
    );
  };
  return (
    <div className="relative z-50">
      {isMobile && !isOpen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="sidebar-multi-level-sidebar"
          type="button"
          className="fixed z-40 top-5 right-4 translate-x-1/2 flex justify-center items-center rounded-full w-10 h-10 text-sm text-gray-500 dark:text-white"
        >
          <span className="sr-only">Open sidebar</span>
          <CiMenuFries className="text-2xl" />
        </button>
      )}

      {(isExpanded || !isMobile) && (
        <aside
          ref={sidebarRef}
          className={`${styles.sidebar} ${styles.sidebarOpen} h-screen bg-white dark:bg-gray-900 transition-all duration-300`}
        >
          <div className={`h-full px-2 py-3 overflow-y-auto bg-white dark:bg-gray-900 border-x border-gray-200 dark:border-gray-700 shadow-sm fixed right-0 ${styles.sidebar} ${styles.sidebarOpen}`}>
            {/* Logo and title section */}
            <div className="flex flex-col items-center gap-2 mb-4">
              <Image
                width={120}
                height={120}
                alt="logo"
                src="/assets/logo/logo.png"
                className="mx-auto"
              />
              {isExpanded && (
                <div className="text-center transition-opacity duration-200">
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t("global_crm")}
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t("admin_panel")}
                  </p>
                </div>
              )}
            </div>

            {/* Navigation links */}
            {state?.userData?.userId && (
              <ul className="space-y-3">
              {links.map((item) => (
                <li key={item.id}>
                  {state?.userData?.role !== "admin" && item.link == "administration" ? "" : renderNavLink(item) }
                </li>
              ))}
            </ul>
            )}
          </div>
        </aside>
      )}
    </div>
  );
}

export default SideBar;