import React from 'react'
import InputField from './InputField';
import { Label } from '@/components/ui/label';
import ClintFollowUp from './ClintFollowUp';
import TextAreaField from './TextAreaField';

function FormFields({ isDisabled, t }) {
    const data = [
        { id: 1, value: "ahmed", label: "Ahmed" },
        { id: 2, value: "mohamed", label: "Mohamed" },
        { id: 3, value: "ali", label: "Ali" },
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
              defaultValue="@peduarte"
              isDisabled={isDisabled}
            />
            <InputField
              label={t("Number")}
              id="number"
              defaultValue="1111"
              isDisabled={isDisabled}
            />
            <InputField
              label={t("Last_Follow_up")}
              id="LastFollowUp"
              defaultValue="30-08-2022"
              isDisabled={isDisabled}
            />
            <TextAreaField
              label={t("descriptions")}
              id="descriptions"
              defaultValue="..."
              isDisabled={isDisabled}
            />
            <div className="space-y-2 flex flex-col justify-center">
              <Label htmlFor="clintFollowUp">{t("Client_follow_up")}</Label>
              <ClintFollowUp data={data} isDisabled={isDisabled} />
            </div>
            <InputField
              label={t("class")}
              id="classType"
              defaultValue="A"
              isDisabled={isDisabled}
            />
          </div>
        </div>
        )
}

export default FormFields