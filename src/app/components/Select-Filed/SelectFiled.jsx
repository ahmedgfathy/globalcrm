import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectFiled({ data, label, id, isDisabled, defaultValue, handleChange,section }) {
  return (
    <div className="space-y-2">
      <Select id={id} defaultValue={defaultValue} onValueChange={(e) => handleChange(section, id, e)}>
        <SelectTrigger className="lg:w-[220px] max-sm:w-full">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {data.map((item) => (
              <SelectItem key={item.value} value={item.value} disabled={isDisabled}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
