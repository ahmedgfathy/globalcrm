import { Label } from "@/components/ui/label";
import { DatePicker } from "antd";
import React from "react";
import dayjs from "dayjs";
import "./style.css"
import { useTranslation } from "@/app/context/TranslationContext";
function DateInput({
  label,
  id,
  defaultValue,
  isDisabled,
  handleChange,
  section,
}) {
  const dateFormat = "YYYY-MM-DD";
  const formattedDefaultValue = defaultValue
    ? dayjs(defaultValue, dateFormat)
    : null;

  const onChange = (date, dateString) => {
    console.log(date)
    if (date && date.isValid()) {
      if (handleChange) {
        handleChange(section || null, id, dateString);
      }
    }
  };
  const { locale} = useTranslation();

  return (
    <div className="space-y-2 flex flex-col">
      <Label htmlFor={id} className="font-semibold lg:w-[220px] sm:w-full " dir={locale === "ar" ? "rtl" : "ltr"}>
        <p className='lg:w-[220px] sm:w-full'>
          {label}
        </p>
      </Label>
      <DatePicker
        value={formattedDefaultValue}
        format={dateFormat}
        disabled={isDisabled || id === "createdTime" || id === "modifiedTime"}
        onChange={onChange}
        placeholder="Select a date"
        className="dark:bg-[#141a21] border-[1px] border-borderSearchInputLight dark:text-Lightbg min-h-[36px] placeholder:text-orange-500 dark:placeholder:text-gray-400 dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md lg:w-[220px] sm:w-full"
      />
    </div>
  );



}

export default DateInput;
