import { Label } from '@/components/ui/label'
import { DatePopover } from '../../Date-Filed/DatePopover';
import React from 'react'

function DateInput({ label, id, defaultValue, isDisabled,handleChange, section }) {
    return (
        <div className="flex flex-col">
            <Label htmlFor={id} className="font-semibold pb-4">{label}</Label>
        <div className="space-y-2 flex flex-col justify-end">
            <Label htmlFor={id}>{label}</Label>
            <DatePopover
            // onChange={(e) => handleChange(section, id, e.target.value)}
            handleChange={handleChange}
            section={section}
                defaultValue={defaultValue}
                isDisabled={isDisabled}
                id={id}
            />
        </div>
    )
}

export default DateInput;