import { Label } from '@/components/ui/label';
import React from 'react';
import { SelectFiled } from '../../Select-Filed/SelectFiled';

function SelectInput({ label, id, isDisabled, data, defaultValue, handleChange,section, value }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="font-semibold">{label}</Label>
      <SelectFiled
        handleChange={handleChange}
        section={section}
        id={id}
        data={data}
        defaultValue={value}
        isDisabled={isDisabled}
      />
    </div>
  );
}

export default SelectInput;
