"use client";
import React from "react";
import Drawer from "../Drawer/Drawer";
import Menu from "../menu/Menu";
import { usePathname } from "next/navigation";

function NavBar() {
  const pathName = usePathname();
  return (
    <nav className="fixed top-0 left-0 right-0 menu-drawer 10" dir="ltr">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 items-center h-10 justify-items-center">
          {pathName.split("/").includes("dashboard") && (
            <div className="avatar lg:col-span-1 max-sm:col-span-2">
              <Menu />
            </div>
          )}
          <div className="setting lg:col-span-1 max-sm:col-span-2 ">
            <Drawer />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
