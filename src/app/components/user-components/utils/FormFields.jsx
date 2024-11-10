import React, { useEffect } from 'react';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import DateInput from './DateInput';
import SelectInput from './SelectInput';
import { useTranslation } from '@/app/context/TranslationContext';

function FormFields({ fields, isDisabled }) {
  const { t, locale } = useTranslation();
  useEffect(()=>{
    console.log(isDisabled)
  }, [isDisabled])
  return (
    <div className="space-y-4 lg:col-span-3" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => {
          const commonProps = {
            key: field.id,
            label: t(field.label),
            id: field.idField,
            defaultValue: field.defaultValue,
            isDisabled,
          };

          switch (field.type) {
            case 'input':
              return <InputField {...commonProps} />;
            case 'textarea':
              return <TextAreaField {...commonProps} />;
            case 'date':
              return <DateInput {...commonProps} />;
            case 'select':
              return (
                <SelectInput
                  {...commonProps}
                  data={field.options}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}

export default FormFields;
