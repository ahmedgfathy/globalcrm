import { useTranslation } from "@/app/context/TranslationContext";
import { Label } from "@/components/ui/label";

export default function TextAreaField({ label, id, defaultValue, isDisabled, section, handleChange }) {
  const { locale} = useTranslation();

  return (
    <div className="space-y-2 sm:col-span-4">
      <Label htmlFor={id} className="font-semibold w-full " dir={locale === "ar" ? "rtl" : "ltr"}
      >
        <p className='w-full'>
          {label}
        </p>
      </Label> 
      <textarea
        disabled={isDisabled}
        onChange={(e) => handleChange(section || null, id, e.target.value)}
        id={id}
        className="w-full h-[100px] py-2 px-3 resize-none dark:bg-[#141a21] border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md"
        defaultValue={defaultValue}
      />
    </div>
  );
}