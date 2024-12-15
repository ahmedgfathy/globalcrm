import React, { useEffect, useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectLabel } from "@/components/ui/select";

function MultiSelectInput({ label, id, defaultValue = [], options, handleChange, isDisabled }) {
  const [selectedValues, setSelectedValues] = useState(defaultValue);

  const toggleSelection = (value) => {
    console.log(value)
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    setSelectedValues(newValues);
    handleChange(id, newValues);
  };
  useEffect(()=>{
    console.log(selectedValues)
  }, [selectedValues])
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <Select disabled={isDisabled} onValueChange={toggleSelection}>
        <SelectTrigger id={id} className="lg:w-[220px] max-sm:w-full">
          {selectedValues.length > 0
            ? selectedValues.map((value) => (
                <span key={value} className="inline-block px-2 py-1 rounded text-sm">
                  {options.find((option) => option.value === value)?.label || value}
                </span>
              ))
            : "Select options"}
        </SelectTrigger>
        <SelectContent>
          {options?.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
            //   onClick={(e) =>{ e.stopPropagation(); e.preventDefault(); toggleSelection(option.value)}}
              className={selectedValues.includes(option.value) ? "bg-gray-100" : ""}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default MultiSelectInput;
