import Link from "next/link";
import React from "react";

function List({ icon, name, link, isActive, isOpen }) {
  return (
    <li
      className={`${
        isActive ? "bg-[#5f942e14] text-[#5f942e]" : ""
      } hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer py-4`}
    >
      <Link
        href={link}
        className={`flex items-center gap-2 ${
          isOpen ? "flex-row" : "flex-col"
        }`}
      >
        <span>{icon()}</span>
        <span>{name}</span>
      </Link>
    </li>
  );
}

export default List;
