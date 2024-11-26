"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/app/context/TranslationContext";
import FormFields from "../user-components/utils/FormFields";



export default function SalesInformation({ page, setIsDisabled, isDisabled, ...props }) {
    const { t } = useTranslation();

    const fieldsData = [
        {
            id: 1,
            type: 'select',
            label: 'handler',
            idField: 'handler',
            defaultValue: props?.unit?.handler,
            options: props?.options?.handler,
        },
        {
            id: 2,
            type: 'select',
            label: 'sales',
            idField: 'sales',
            defaultValue: props?.unit?.sales,
            options: props?.options?.sales,
        },
        {
            id: 3,
            type: 'select',
            label: 'category',
            idField: 'category',
            defaultValue: props?.unit?.category,
            options: props?.options?.category,
        },
    ];

    return (
        <Card className="menu-drawer w-full h-max bg-Lightbg dark:bg-cardbgDark shadow-box_shadow dark:shadow-none pb-2 pt-2 overflow-x-hidden" dir="rtl">
            <div className="header w-full flex justify-between items-center pb-4">
                <p className="text-xl font-bold">{t("sales_information")}</p>
            </div>
            <CardContent className="w-full min-w-max overflow-x-auto" dir="rtl">
                <FormFields fields={fieldsData} isDisabled={isDisabled} handleChange={props.handleChange} section={props.section} />
            </CardContent>
        </Card>
    );
}
