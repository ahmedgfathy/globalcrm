"use client";
import { useTranslation } from "@/app/context/TranslationContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { FcSettings } from "react-icons/fc";
import { SettingOutlined } from '@ant-design/icons';

function Drawer() {
  const [showDrawer, setShowDrawer] = useState(false);
  const { t, changeLanguage } = useTranslation();
  return (
    <div className="drawer">
      <div className="container mx-auto relative">
        <div className="absolute top-0 left-0 z-40">
          <div className="text-center">
            <button
              onClick={() => setShowDrawer(!showDrawer)}
              className=""
              type="button"
              data-drawer-target="drawer-example"
              data-drawer-show="drawer-example"
              aria-controls="drawer-example"
            >
              <SettingOutlined className="text-2xl " spin/>
            </button>
          </div>
          <div
            id="drawer-example"
            className={`fixed top-0  z-40 ${
              showDrawer ? "left-80" : "left-0"
            } h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-80 dark:bg-gray-800`}
            tabIndex={-1}
            aria-labelledby="drawer-label"
          >
            <button
              type="button"
              onClick={() => setShowDrawer(!showDrawer)}
              data-drawer-hide="drawer-example"
              aria-controls="drawer-example"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close menu</span>
            </button>
            <div className="main">
              <Select onValueChange={(e) => changeLanguage(e)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
