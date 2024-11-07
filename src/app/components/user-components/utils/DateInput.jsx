import { Label } from '@/components/ui/label'
import { DatePopover } from '../../Date-Filed/DatePopover';
import React from 'react'

function DateFiled({ label, id, defaultValue, isDisabled }) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <DatePopover defaultValue={defaultValue} />
        </div>
    )
}

export default DateFiled;