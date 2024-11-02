import React from 'react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
function ControlCard({ icon, label, isChecked, onToggle }) {
    return (
      <Label className="change-lang flex flex-col items-center border p-2 rounded-sm w-full border-gray-300 hover:bg-gray-100 duration-200">
        <div className="icon mb-2 flex items-center">
          {icon}
          <span className="ml-2">{label}</span>
        </div>
        <Switch onCheckedChange={onToggle} checked={isChecked} 
        style={{
            backgroundColor: isChecked ? "#4CAF50" : "#ccc",
          }}
        />
      </Label>
    );
  }

export default ControlCard