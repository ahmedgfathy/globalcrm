"use client";
<<<<<<< HEAD
import { useTranslation } from "@/app/context/TranslationContext";
import { MdLanguage } from "react-icons/md";
import React, { useState } from "react";
import { SettingTwoTone } from "@ant-design/icons";
import { IoMdClose } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import { RiFullscreenFill } from "react-icons/ri";
import { TiWeatherPartlySunny } from "react-icons/ti";
import ControlCard from "../control-card/ControlCard";
import { useTheme } from "next-themes";
import "./drawer.css";
=======
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "@/app/context/TranslationContext";
import { useTheme } from "next-themes";
import { IoMdClose } from "react-icons/io";
import { MdLanguage } from "react-icons/md";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { SettingsIcon } from "../../../../public/assets/icons";
import ControlCard from "../control-card/ControlCard";

>>>>>>> aee03c118f7949eea3560d62351b461e661c0d8e
function Drawer() {
  const { setTheme } = useTheme();
  const [showDrawer, setShowDrawer] = useState(false);
  const { t, changeLanguage } = useTranslation();
  const [lang, setLang] = useState("en");
  const [mode, setMode] = useState("light");
<<<<<<< HEAD

  const toggleDrawer = () => setShowDrawer(!showDrawer);
=======
  const drawerRef = useRef(null);

  const toggleDrawer = () => setShowDrawer((prev) => !prev);
>>>>>>> aee03c118f7949eea3560d62351b461e661c0d8e
  const toggleLanguage = () => {
    const newLang = lang === "en" ? "ar" : "en";
    setLang(newLang);
    changeLanguage(newLang);
  };
  const changeTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    setTheme(newMode);
  };
<<<<<<< HEAD
  return (
    <div className="drawer">
      <div className="container mx-auto relative">
        <button onClick={toggleDrawer} className="absolute top-4 left-4 ">
          <SettingTwoTone className="animate-spin text-xl duration-3000" />
        </button>

        <div
          className={`fixed top-0 left-0 z-40 h-screen p-4 bg-white dark:bg-gray-800 shadow-xl w-80 transition-transform duration-600 menu ${
=======

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
    <div className="drawer">
      <div className="container mx-auto relative">
        <button
          onClick={toggleDrawer}
          className="w-8 h-8 rounded-full dark:bg-anti-flash_white-700 duration-200 flex dark:hover:bg-anti-flash_white justify-center items-center"
        >
          <SettingsIcon className="animate-spin w-6 h-6 duration-3000" />
        </button>

        <div
          dir="rtl"
          ref={drawerRef}
          className={`fixed top-0 left-0 z-40 h-screen p-4 menu-drawer text:dark dark:text-anti-flash_white shadow-xl w-80 transition-transform duration-500 ${
>>>>>>> aee03c118f7949eea3560d62351b461e661c0d8e
            showDrawer ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-labelledby="drawer-label"
        >
<<<<<<< HEAD
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">{t("settings")}</h1>
            <div className="flex gap-4 flex-row-reverse">
              <button onClick={toggleDrawer}>
                <IoMdClose />
              </button>
              <button>
                <GrPowerReset />
              </button>
              <button>
                <RiFullscreenFill />
              </button>
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <ControlCard
              icon={<MdLanguage />}
=======
          <div
            className={`flex justify-between items-center mb-4 ${
              lang === "ar" ? "flex-row" : "flex-row-reverse"
            }`}
          >
            <h1 className="text-2xl font-semibold">{t("settings")}</h1>
            <button onClick={toggleDrawer}>
              <IoMdClose />
            </button>
          </div>

          <div
            className={`flex gap-4 mb-4 ${
              lang === "en" ? "text-left" : "text-right"
            }`}
          >
            <ControlCard
              icon={<MdLanguage className="text-xl" />}
>>>>>>> aee03c118f7949eea3560d62351b461e661c0d8e
              label={lang === "en" ? "English" : "العربية"}
              isChecked={lang === "ar"}
              onToggle={toggleLanguage}
            />
            <ControlCard
<<<<<<< HEAD
              icon={<TiWeatherPartlySunny />}
=======
              icon={<TiWeatherPartlySunny className="text-xl" />}
>>>>>>> aee03c118f7949eea3560d62351b461e661c0d8e
              label={t("mode")}
              isChecked={mode === "dark"}
              onToggle={changeTheme}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
