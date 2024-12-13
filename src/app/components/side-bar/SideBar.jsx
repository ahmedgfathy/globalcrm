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
      {isMobile && !isOpen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="sidebar-multi-level-sidebar"
          type="button"
          className="fixed z-40 top-5 right-4 translate-x-1/2 flex justify-center items-center rounded-lg w-10 h-10 text-slate-600 hover:bg-slate-100 transition-colors duration-200"
        >
          <span className="sr-only">Open sidebar</span>
          <CiMenuFries className="text-2xl" />
        </button>
      )}

      {(isOpen || !isMobile) && (
        <aside
          ref={sidebarRef}
          id="sidebar-multi-level-sidebar"
          className={`${styles.sidebar} ${
            isOpen ? styles.sidebarOpen : styles.sidebarClosed
          } fixed right-0 top-0 h-screen border-l border-slate-200`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto">
            <ul className="space-y-2 font-medium">
              <li className="mb-6">
                <Image
                  width={110}
                  height={110}
                  alt="logo"
                  src="/assets/logo/logo.jpeg"
                  className={`mx-auto transition-transform duration-300 ${
                    !isOpen && !isMobile ? 'scale-75' : ''
                  }`}
                />
              </li>

              {links.map((item) => (
                <li key={item.id} className={styles.menuItem}>
                  <Link
                    href={`/${item.link}`}
                    onClick={() => isMobile && setIsOpen(false)}
                    className={`flex items-center gap-3 p-3 transition-all duration-200 ${
                      isOpen
                        ? "flex-row text-base"
                        : "flex-col justify-center items-center text-sm"
                    } ${
                      isActive(item.link)
                        ? styles.activeMenuItem
                        : "text-slate-600 hover:text-slate-800"
                    }`}
                  >
                    <span className={`text-xl ${
                      isActive(item.link) ? "text-slate-800" : "text-slate-500"
                    }`}>
                      {item.icon()}
                    </span>
                    <span className={`whitespace-nowrap transition-all duration-200 ${
                      !isOpen && !isMobile ? "opacity-0 scale-0" : "opacity-100 scale-100"
                    }`}>
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
