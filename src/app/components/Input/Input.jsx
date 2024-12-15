import React from "react";

export default function Input({ name, type, placeholder, onChange, value }) {
  return (
    <div className="input flex flex-col w-full static">
      <label
        htmlFor={name}
        className="text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-[#fff] dark:bg-dark w-fit dark:text-[#aaa] text-black bg-[#fff] dark:bg-gray-900 ltr:ml-[7px] rtl:right-[10px]"
      >
        {placeholder}
      </label>
      <input
        id={name}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        className="input px-[10px] py-[11px] text-xm h-12 border-3 rounded-[5px] focus:outline-none placeholder:text-black/25 dark:text-[#aaa] text-black bg-[#fff] dark:bg-gray-900 border border-[#aaa] dark:border-gray-700"
      />
    </div>
  );
}
