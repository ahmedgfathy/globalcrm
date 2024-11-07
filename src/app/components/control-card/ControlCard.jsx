import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
function ControlCard({ icon, label, isChecked, onToggle }) {
  return (
<<<<<<< HEAD
    <Label className="change-lang flex flex-col  border px-2 py-4 rounded-sm w-full border-gray-300 hover:bg-gray-100 duration-200">
=======
    <Label className="change-lang flex flex-col  border px-2 py-4 rounded-sm w-full border-gray-300 text-dark dark:text-anti-flash_white duration-200">
>>>>>>> aee03c118f7949eea3560d62351b461e661c0d8e
      <div className="icon mb-2 flex items-center justify-between w-full">
        {icon}
        <Switch
          onCheckedChange={onToggle}
          checked={isChecked}
          style={{
            backgroundColor: isChecked ? "#4CAF50" : "#ccc",
            direction: "ltr",
          }}
        />
      </div>
      <div className="title mt-2">
        <h1 className="text-lg font-bold">{label}</h1>
      </div>
    </Label>
  );
}

export default ControlCard;
