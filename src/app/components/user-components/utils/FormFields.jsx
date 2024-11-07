import React from 'react'
import InputField from './InputField';
import ClintFollowUp from './ClintFollowUp';
import TextAreaField from './TextAreaField';
import DateInput from './DateInput';
import SelectInput from './SelectInput';

function FormFields({ isDisabled, t }) {
  const data = [
    { id: 1, value: "ahmed", label: "Ahmed" },
    { id: 2, value: "mohamed", label: "Mohamed" },
    { id: 3, value: "ali", label: "Ali" },
  ];

  const classTypeData = [
    { value: "A", label: "Class A" },
    { value: "B", label: "Class B" },
    { value: "C", label: "Class C" },
  ];

  return (
    <div className="space-y-4 lg:col-span-3">
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          label={t("name_client")}
          id="name"
          defaultValue="Pedro Duarte"
          isDisabled={isDisabled}
        />
        <InputField
          label={t("lead_number")}
          id="username"
          defaultValue="111"
          isDisabled={isDisabled}
        />
        <InputField
          label={t("Number")}
          id="number"
          defaultValue="01147484754"
          isDisabled={isDisabled}
        />
        <DateInput
          label={t("Last_Follow_up")}
          id="LastFollowUp"
          defaultValue="2022-08-30"
          isDisabled={isDisabled}
        />
        <TextAreaField
          label={t("descriptions")}
          id="descriptions"
          defaultValue="..."
          isDisabled={isDisabled}
        />
        <div className="space-y-2 flex flex-col justify-center">
          <SelectInput
            label={t("Client_follow_up")}
            id="clintFollowUp"
            defaultValue="mohamed"
            data={data}
            isDisabled={isDisabled}
          />
        </div>

        <SelectInput
          label={t("class")}
          id="classType"
          defaultValue="B"
          data={classTypeData}
          isDisabled={isDisabled}
        />
      </div>
    </div>
  )
}

export default FormFields