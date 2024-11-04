"use client";
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "@/app/context/TranslationContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoMdClose } from "react-icons/io";
import { lists } from "./data.js";
import { Button } from "@/components/ui/button";

function Menu() {
  const [showDrawer, setShowDrawer] = useState(false);
  const { t, locale } = useTranslation();
  const drawerRef = useRef(null);

  const toggleDrawer = () => setShowDrawer((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setShowDrawer(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="drawer" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="container mx-auto relative">
        <button onClick={toggleDrawer} className=" ">
          <Avatar className="border border-red-600">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </button>

        <div
          ref={drawerRef}
          className={`fixed top-0 left-0
           z-40 h-screen p-4  menu-drawer flex flex-col justify-between shadow-xl w-80 transition-transform duration-500 ${
             showDrawer ? "translate-x-0" : "-translate-x-full"
           }`}
          aria-labelledby="drawer-label"
        >
          <div className="header border-b border-gray-200 pb-4 flex flex-col justify-center items-center">
            <button onClick={toggleDrawer} className="w-full text-start">
              <IoMdClose />
            </button>
            <Avatar className="border border-red-600 w-24 h-24">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h1 className="text-lg font-bold">Admin</h1>
              <h3 className="text-lg font-bold">email@email.com</h3>
            </div>
          </div>

          <ul className="flex flex-col gap-2 mb-4">
            {lists.map((list) => (
              <li
                key={list.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-200 cursor-pointer py-2 flex gap-3 items-center rounded-md text-gray-400 dark:hover:text-dark"
              >
                <span>{list.icon()}</span>
                <span className="text-lg">{t(list.name)}</span>
              </li>
            ))}
          </ul>

          <Button className="w-full text-red-800 bg-red-400 hover:bg-red-500 text-xl font-bold">
            {t("log_out")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Menu;
