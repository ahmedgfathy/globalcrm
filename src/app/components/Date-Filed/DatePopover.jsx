"use client"

import * as React from "react"
import { format } from "date-fns"
import { useState, useEffect } from "react"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function DatePopover({ defaultValue, isDisabled, handleChange,section, id }) {
    const [date, setDate] = useState(null)

    useEffect(() => {
        if (defaultValue) {
            const parsedDate = new Date(defaultValue);
            if (!isNaN(parsedDate)) {
                setDate(parsedDate);
            } else {
                console.warn("Invalid date format. Please use 'YYYY-MM-DD'.");
            }
        }
    }, [defaultValue]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "dark:bg-[#141a21] border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md lg:w-[220px] max-sm:w-full ",
                        !date && "text-muted-foreground"
                    )}
                    disabled={isDisabled}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date instanceof Date && !isNaN(date)
                        ? format(date, "PPP")
                        : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            {!isDisabled && (
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(selectedDate) => {setDate(selectedDate); handleChange(section || null, id, selectedDate) }}
                        initialFocus
                        disabled={isDisabled}
                    />
                </PopoverContent>
            )}
        </Popover>
    )
}