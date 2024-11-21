"use client";
import React, { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
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

function SettingsLead() {
  const [options, setOptions] = useState({});
  const [newValues, setNewValues] = useState({});

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
                      <SelectItem key={index} value={option}>
                        <div className="flex justify-between items-center w-full">
                          {option}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.preventDefault();
                              handleDeleteOption(box.name, option);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </SelectItem>
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
