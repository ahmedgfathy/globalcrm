"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/app/context/TranslationContext";
import FormFields from "../user-components/utils/FormFields";



export default function UnitsDetails({ page, setIsDisabled, isDisabled, ...props }) {
    const { t } = useTranslation();

    const fieldsData = [
        { id: 1, type: 'input', label: 'created_time', idField: 'createdTime', defaultValue: page !== "add" ? "26-10-2024 5:29 PM" : "" },
        { id: 2, type: 'input', label: 'modified_time', idField: 'modifiedTime', defaultValue: page !== "add" ? "10-11-2024 9:01 PM" : "" },
        { id: 3, type: 'input', label: 'land_area', idField: 'landArea', defaultValue: page !== "add" ? "" : "" },
        {
            id: 4,
            type: 'select',
            label: 'currency',
            idField: 'currency',
            defaultValue: page !== "add" ? 'Dollar' : "",
            options: [
                { value: 'Dollar', label: 'Dollar' },
                { value: 'EGY', label: 'EGY' },
            ],
        },
        { id: 5, type: 'date', label: 'rent_from', idField: 'rentFrom', defaultValue: page !== "add" ? "10-11-2024 9:01 PM" : "" },
        { id: 6, type: 'date', label: 'rent_to', idField: 'rentTo', defaultValue: page !== "add" ? "10-12-2024 9:01 PM" : "" },

    ];

    return (
        <Card className="menu-drawer w-full h-max bg-Lightbg dark:bg-cardbgDark shadow-box_shadow dark:shadow-none pb-2 pt-2 overflow-x-hidden">
            <div className="header w-full flex justify-between items-center pb-4">
                <p className="text-xl font-bold">{t("unit_details")}</p>
            </div>
            <CardContent className="w-full overflow-x-auto" dir="rtl">
                <FormFields fields={fieldsData} isDisabled={isDisabled} handleChange={props.handleChange} section={props.section} />
            </CardContent>
        </Card>
    );
}
