"use client";
import React, { useState } from "react";
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
import { useTranslation } from "@/app/context/TranslationContext";

const selectBoxes = [
    { name: "UnitFor", label: "unit_for" },
    { name: "area", label: "area" },
    { name: "rooms", label: "rooms" },
    { name: "phase", label: "phase" },
    { name: "type", label: "type" },
    { name: "finished", label: "finished" },
    { name: "inOrOutSideCompound", label: "inside_outside" },
    { name: "activity", label: "activity" },
    { name: "propertyOfferedBy", label: "property_offered_by" },
    { name: "forUpdate", label: "update" },
    { name: "callUpdate", label: "update_calls" },
    { name: "handler", label: "handler" },
    { name: "sales", label: "sales" },
    { name: "category", label: "category" },
    { name: "currency", label: "currency" },
];



function SettingsUnits({ handleDeleteOption, setNewValues, options, newValues, handleAddOption }) {
    const { t } = useTranslation()

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectBoxes.map((box) => (
                    <Card key={box.name} className="bg-Lightbg dark:bg-cardbgDark">
                        <CardHeader>
                            <CardTitle className="font-bold">{t(`${box.label}`)}</CardTitle>
                            <CardDescription className="dark:text-[#b8b9b9] font-semibold">{t("Options_management")} {t(`${box.label}`)}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t(`${box.label}`)} />
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
                                                        handleDeleteOption(box.name, option, "unit");
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
                                        className="font-semibold"
                                        placeholder={t(`add`) + " " + t(`${box.label}`) + " " + t(`new`)}
                                        value={newValues[box.name] || ""}
                                        onChange={(e) =>
                                            setNewValues((prev) => ({
                                                ...prev,
                                                [box.name]: e.target.value,
                                            }))
                                        }
                                    />
                                    <Button
                                        onClick={() => handleAddOption(box.name, "unit")}
                                        style={{
                                            backgroundColor: "rgba(91, 228, 155, 0.1)",
                                            color: "#5be49b",
                                        }}
                                    >
                                        <Plus className="h-4 w-4 mr-2" /> {t(`add`)}
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

export default SettingsUnits;
