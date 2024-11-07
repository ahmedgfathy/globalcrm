<<<<<<< HEAD
import  Input  from "./Input/Input";
import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
=======
import Input from "./Input/Input";
import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useTranslation } from "../context/TranslationContext";
>>>>>>> aee03c118f7949eea3560d62351b461e661c0d8e

function PasswordInput({
  show,
  val,
  name,
  placeholder,
  changeType,
  handleChange,
}) {
<<<<<<< HEAD
=======
  const { locale } = useTranslation();

>>>>>>> aee03c118f7949eea3560d62351b461e661c0d8e
  return (
    <div className="password relative w-full">
      {name === "password" && (
        <span
<<<<<<< HEAD
          className="absolute -translate-y-1/2 top-[65%] right-3 cursor-pointer w-6 h-6 rounded-full flex justify-center items-center bg-gray-200 hover:bg-gray-300 duration-200 "
=======
          className={`absolute ${
            locale === "en" ? "right-3" : "left-3"
          } -translate-y-1/2 top-[65%]  cursor-pointer w-6 h-6 rounded-full flex justify-center items-center bg-gray-200 hover:bg-gray-300 duration-200`}
>>>>>>> aee03c118f7949eea3560d62351b461e661c0d8e
          onClick={changeType}
        >
          {show ? <AiFillEye /> : <AiFillEyeInvisible />}
        </span>
      )}
      <Input
        name={name}
        value={val}
        onChange={handleChange}
        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
        type={show ? "text" : "password"}
        placeholder={placeholder}
      />
    </div>
  );
}

export default PasswordInput;
