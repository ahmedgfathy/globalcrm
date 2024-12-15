"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/app/context/TranslationContext";

const TagInput = ({ label, id, defaultValue = [], isDisabled = false, section, handleChange }) => {
  const [tags, setTags] = useState(defaultValue);
  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      const trimmedInput = inputValue.trim();

      if (!tags.includes(trimmedInput)) {
        // تحديث قائمة الـ tags
        setTags((prevTags) => {
          const updatedTags = [...prevTags, trimmedInput];

          // تحديث الكائن unit باستخدام handleChange
          if (handleChange) {
            handleChange(section || null, id, updatedTags);
          }

          return updatedTags;
        });
      }

      setInputValue("");
    }
  };

  const handleRemoveTag = (index) => {
    setTags((prevTags) => {
      const updatedTags = prevTags.filter((_, i) => i !== index);

      // تحديث الكائن unit باستخدام handleChange
      if (handleChange) {
        handleChange(section || null, id, updatedTags);
      }

      return updatedTags;
    });
  };
  const { locale} = useTranslation();

  return (
    <div className="space-y-2 sm:col-span-3">
      <Label htmlFor={id} className="font-semibold w-full " dir={locale === "ar" ? "rtl" : "ltr"}
      >
        <p className='w-full'>
          {label}
        </p>
      </Label>
      <Input
        disabled={isDisabled}
        id={id}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        className="w-full h-12 dark:bg-[#141a21] border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md"
      />
      <div className="w-full mt-2 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 px-2 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-md cursor-pointer"
            onClick={() => handleRemoveTag(index)}
          >
            <span>{tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
