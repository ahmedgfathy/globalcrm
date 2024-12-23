import { Label } from '@/components/ui/label';
import React, { useContext } from 'react';
import { SelectFiled } from '../../Select-Filed/SelectFiled';
import { useTranslation } from '@/app/context/TranslationContext';
import { UserContext } from '@/app/context/UserContext';

function SelectInput({ label, id, isDisabled, data, defaultValue, handleChange, section, value, required }) {
  const { locale } = useTranslation();
  const [state] = useContext(UserContext)

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
        isDisabled={isDisabled || (!state?.userData?.userId && id=="propertyOfferedBy" ) }
      />
    </div>
  );
}

export default SelectInput;
