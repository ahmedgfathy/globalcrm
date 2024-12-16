import { Label } from '@/components/ui/label';
import React from 'react';
import { SelectFiled } from '../../Select-Filed/SelectFiled';
import { useTranslation } from '@/app/context/TranslationContext';

function SelectInput({ label, id, isDisabled, data, defaultValue, handleChange, section, value, required }) {
  const { locale } = useTranslation();

  return (
    <div className="space-y-2 lg:w-[220px] sm:w-full">
      <Label htmlFor={id} className="font-semibold lg:w-[220px] sm:w-full " dir={locale === "ar" ? "rtl" : "ltr"}>
        <p className='lg:w-[220px] sm:w-full'>
          {label} {required && (<span className="text-red-500">*</span>)}
        </p>
      </Label>
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
