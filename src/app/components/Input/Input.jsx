<<<<<<< HEAD
import React from 'react'

export default function Input({name, type, placeholder}) {
  return (
<div className="input flex flex-col w-full static">
  <label htmlFor={name} className="text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-[#fff] w-fit text-[#aaa]">{placeholder}</label>
  <input id={name} type={type} placeholder={placeholder} name={name} className="input px-[10px] py-[11px] text-xm h-12 bg-[#fff] border-2 rounded-[5px] focus:outline-none placeholder:text-black/25" />
</div>

  )
}

=======
import React from "react";

export default function Input({ name, type, placeholder }) {
  return (
    <div className="input flex flex-col w-full static">
      <label
        htmlFor={name}
        className="text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-[#fff] dark:bg-gray-900  w-fit text-[#aaa] dark:text-gray-300"
      >
        {placeholder}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        name={name}
        className="input px-[10px] py-[11px] text-xm h-12 bg-[#fff] border-2 rounded-[5px] focus:outline-none placeholder:text-black/25"
      />
    </div>
  );
}
>>>>>>> aee03c118f7949eea3560d62351b461e661c0d8e
