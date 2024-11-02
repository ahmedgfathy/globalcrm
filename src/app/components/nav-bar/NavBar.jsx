import React from "react";
import Drawer from "../Drawer/Drawer";
import { Avatar } from "antd";

function NavBar() {
  return (
    <nav className="fixed top-0  left-0 right-10 ">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 items-center h-20">
          <div className="avatar col-span-1">
            <Avatar
              src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
              size="large"
              className="border border-red-600"
            />
          </div>
          <div className="setting col-span-1">
            <Drawer />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
