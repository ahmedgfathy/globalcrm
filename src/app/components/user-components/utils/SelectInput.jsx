import { Label } from '@/components/ui/label';
import React from 'react';
import { SelectFiled } from '../../Select-Filed/SelectFiled';

function SelectInput({ label, id, isDisabled, data, defaultValue }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <SelectFiled
        id={id}
        data={data}
        defaultValue={defaultValue}
        isDisabled={isDisabled}
      />
    </div>
  );
}

export default SelectInput;
