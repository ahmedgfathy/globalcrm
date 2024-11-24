  import { Input } from '@/components/ui/input'
  import { Label } from '@/components/ui/label'
  import React from 'react'

// function InputField({ label, id, defaultValue, isDisabled }) {
//   return (
//     <div className="space-y-2">
//     <Label htmlFor={id} className="font-semibold">{label}</Label>
//     <Input
//       disabled={isDisabled}
//       id={id}
//       className="dark:bg-[#141a21] border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md w-[180px]"
//       defaultValue={defaultValue}
//     />
//   </div>
//   )
// }
  function InputField({ label, id, defaultValue, isDisabled, section,handleChange }) {
    return (
      <div className="space-y-2">
      <Label htmlFor={id} className="font-semibold">{label}</Label>
      <Input
        disabled={isDisabled || id === "leadNumber"}
        onChange={(e) => handleChange(section || null, id, e.target.value)}
        id={id}
        className="dark:bg-[#141a21] border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md lg:w-[220px] sm:w-full"
        defaultValue={defaultValue}
      />
    </div>
    )
  }

  export default InputField