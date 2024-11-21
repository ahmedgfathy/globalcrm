"use client";
import React, { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const selectBoxes = [
  { name: "clientFollowUp", label: "Client Follow Up" },
  { name: "assignedTo", label: "Assigned To" },
  { name: "customerSource", label: "Customer Source" },
  { name: "type", label: "Type" },
  { name: "leadStatus", label: "Lead Status" },
  { name: "class", label: "Class" },
];

const dummyData = {
  clientFollowUp: ["Follow Up 1", "Follow Up 2"],
  assignedTo: ["John Doe", "Jane Smith"],
  customerSource: ["Website", "Referral"],
  type: ["New", "Existing"],
  leadStatus: ["Open", "Closed"],
  class: ["Class A", "Class B"],
};

function SettingsLead() {
  const [options, setOptions] = useState(dummyData);
  const [newValues, setNewValues] = useState({});

  const handleAddOption = (boxName) => {
    if (newValues[boxName]) {
      setOptions((prev) => ({
        ...prev,
        [boxName]: [...(prev[boxName] || []), newValues[boxName]],
      }));
      setNewValues((prev) => ({
        ...prev,
        [boxName]: "",
      }));
    }
  };

  const handleDeleteOption = (boxName, optionToDelete) => {
    console.log("delete");
    setOptions((prev) => ({
      ...prev,
      [boxName]: prev[boxName].filter((option) => option !== optionToDelete),
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectBoxes.map((box) => (
          <Card key={box.name} className="bg-Lightbg dark:bg-cardbgDark">
            <CardHeader>
              <CardTitle>{box.label}</CardTitle>
              <CardDescription>Options management {box.label}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={`${box.label}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {options[box.name]?.map((option, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between px-2 py-1"
                      >
                        <span>{option}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDeleteOption(box.name, option);
                          }}
                          className="text-red-500 hover:bg-transparent hover:border hover:border-red-500 hover:text-red-600 duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder={`Add ${box.label} New`}
                    value={newValues[box.name] || ""}
                    onChange={(e) =>
                      setNewValues((prev) => ({
                        ...prev,
                        [box.name]: e.target.value,
                      }))
                    }
                  />
                  <Button
                    onClick={() => handleAddOption(box.name)}
                    style={{
                      backgroundColor: "rgba(91, 228, 155, 0.1)",
                      color: "#5be49b",
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default SettingsLead;
