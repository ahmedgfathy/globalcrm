import { Label } from "@/components/ui/label";
import { DatePopover } from "../../Date-Filed/DatePopover";
import { DatePicker } from 'antd';
import React from "react";

function DateInput({
  label,
  id,
  defaultValue,
  isDisabled,
  handleChange,
  section,
}) {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div className="space-y-2 flex flex-col justify-end">
      <Label htmlFor={id}>{label}</Label>
      <DatePicker
      value={defaultValue}
      disabled={isDisabled}
      
      onChange={(e)=>handleChange(section || null, id, e)} 
      className="dark:bg-[#141a21] border-[1px] border-borderSearchInputLight dark:text-Lightbg min-h-[36px] dark:placeholder:text-Lightbg dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md lg:w-[220px] sm:w-full" />
      {/* <DatePopover
        handleChange={handleChange}
        section={section}
        defaultValue={defaultValue}
        isDisabled={isDisabled}
        id={id}
      /> */}
    </div>
  );
}

export default DateInput;
