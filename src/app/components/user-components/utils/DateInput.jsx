import { Label } from '@/components/ui/label'
import { DatePopover } from '../../Date-Filed/DatePopover';
import React from 'react'

function DateInput({ label, id, defaultValue, isDisabled }) {
    return (
        <div className="flex flex-col">
            <Label htmlFor={id} className="font-semibold pb-4">{label}</Label>
            <DatePopover
                defaultValue={defaultValue}
                isDisabled={isDisabled}
                id={id}
            />
        </div>
    )
}

export default DateInput;