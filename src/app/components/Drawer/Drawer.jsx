"use client";
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
function Drawer() {
  const { setTheme } = useTheme();
  const [showDrawer, setShowDrawer] = useState(false);
  const { t, changeLanguage } = useTranslation();
  const [lang, setLang] = useState("en");
  const [mode, setMode] = useState("light");

  const toggleDrawer = () => setShowDrawer(!showDrawer);
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
  return (
    <div className="drawer">
      <div className="container mx-auto relative">
        <button onClick={toggleDrawer} className="absolute top-4 left-4 ">
          <SettingTwoTone className="animate-spin text-xl duration-3000" />
        </button>

        <div
          className={`fixed top-0 left-0 z-40 h-screen p-4 bg-white dark:bg-gray-800 shadow-xl w-80 transition-transform duration-600 menu ${
            showDrawer ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-labelledby="drawer-label"
        >
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
              label={lang === "en" ? "English" : "العربية"}
              isChecked={lang === "ar"}
              onToggle={toggleLanguage}
            />
            <ControlCard
              icon={<TiWeatherPartlySunny />}
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
