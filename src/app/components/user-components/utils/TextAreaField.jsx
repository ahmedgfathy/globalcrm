import { Label } from "@/components/ui/label";

export default function TextAreaField({ label, id, defaultValue, isDisabled }) {
    return (
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor={id}>{label}</Label>
        <textarea
          disabled={isDisabled}
          id={id}
          className="w-full h-[100px] py-2 px-3 resize-none dark:bg-cardbgDark border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md"
          defaultValue={defaultValue}
        />
      </div>
    );
  }