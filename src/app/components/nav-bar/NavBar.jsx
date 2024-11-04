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
        <div className="flex items-center h-10">
          {pathName.split("/").includes("dashboard") && (
            <div className="avatar mx-5">
              <Menu />
            </div>
          )}
          <div className="setting  ">
            <Drawer />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
