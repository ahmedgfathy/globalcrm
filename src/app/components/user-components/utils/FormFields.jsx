import React from "react";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import DateInput from "./DateInput";
import SelectInput from "./SelectInput";
import { useTranslation } from "@/app/context/TranslationContext";
import TagInput from "./TagInput";

function FormFields({ fields, isDisabled, handleChange, section }) {
  const { t, locale } = useTranslation();
  return (
    <div
      className="space-y-4 lg:col-span-3"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="grid gap-1 grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
      {fields.map((field) => {
  const commonProps = {
    label: t(field.label),
    id: field.idField,
    defaultValue: field.defaultValue,
    isDisabled,
    handleChange,
    section
  };

  switch (field.type) {
    case 'input':
      return <InputField key={field.id} {...commonProps} />;
    case 'textarea':
      return <TextAreaField key={field.id} {...commonProps} />;
    case 'date':
      return <DateInput key={field.id} {...commonProps} />;
    case 'taginput':
      return <TagInput key={field.id} {...commonProps} />;
    case 'select':
      return <SelectInput key={field.id} {...commonProps} data={field.options} value={field.defaultValue} />;
    default:
      return null;
  }
})}

      </div>
    </div>
  );
}

export default FormFields;
