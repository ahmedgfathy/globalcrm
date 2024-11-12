import { Label } from '@/components/ui/label';
import React from 'react';
import { SelectFiled } from '../../Select-Filed/SelectFiled';

function SelectInput({ label, id, isDisabled, data, defaultValue, handleChange,section }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <SelectFiled
        handleChange={handleChange}
        section={section}
        id={id}
        data={data}
        value={defaultValue}
        isDisabled={isDisabled}
      />
    </div>
  );
}

export default SelectInput;
