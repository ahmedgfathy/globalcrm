"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/app/context/TranslationContext";
import FormFields from "../user-components/utils/FormFields";



export default function CustomInformation({ page, setIsDisabled, isDisabled, ...props }) {
    const { t } = useTranslation();

    const fieldsData = [
        {
            id: 1,
            type: 'select',
            label: 'property_offered_by',
            idField: 'propertyOfferedBy',
            defaultValue: page !== "add" ? 'مالك' : "",
            options: [
                { value: 'مالك', label: 'مالك' },
                { value: 'مسؤول طرف المالك', label: 'مسؤول طرف المالك' },
                { value: 'مكتب عقاري', label: 'مكتب عقاري' },
                { value: 'حارس العقار', label: 'حارس العقار' }
            ],
        },
        { id: 2, type: 'input', label: 'name', idField: 'name', defaultValue: page !== "add" ? "khalid" : "" },
        { id: 3, type: 'input', label: 'unit_no', idField: 'unitNo', defaultValue: page !== "add" ? "1010" : "" },
        {
            id: 4,
            type: 'select',
            label: 'update',
            idField: 'update',
            defaultValue: page !== "add" ? 'New rented' : "",
            options: [
                { value: 'Want Upadate', label: 'Want Upadate' },
                { value: 'Hidden', label: 'Hidden' }
            ],
        },
        { id: 5, type: 'input', label: 'mobile_no', idField: 'mobileNo', defaultValue: page !== "add" ? "01087559165" : "" },
        { id: 6, type: 'input', label: 'tel', idField: 'tel', defaultValue: page !== "add" ? "" : "" },
        {
            id: 7,
            type: 'select',
            label: 'update_calls',
            idField: 'updateCalls',
            defaultValue: page !== "add" ? 'تم الرد' : "",
            options: [
                { value: 'تم الرد', label: 'تم الرد' },
                { value: 'لا يرد', label: 'لا يرد' },
                { value: 'مغلق', label: 'مغلق' },
                { value: 'رقم دولي', label: 'رقم دولي' },
                { value: 'بيكنسل', label: 'بيكنسل' },
                { value: 'غير موجود بالخدمه', label: 'غير موجود بالخدمة' },
                { value: 'بدون رقم موبايل', label: 'بدون رقم موبايل' },
                { value: 'الرقم غلط', label: 'الرقم غلط' }
            ]
        },
    ];

    return (
        <Card className="menu-drawer w-full h-max bg-Lightbg dark:bg-cardbgDark shadow-box_shadow dark:shadow-none pb-2 pt-2 overflow-x-hidden">
            <div className="header w-full flex justify-between items-center pb-4">
                <p className="text-xl font-bold"> {t("custom_information")}</p>
            </div>
            <CardContent className="w-full min-w-max overflow-x-auto" dir="rtl">
                <FormFields fields={fieldsData} isDisabled={isDisabled} handleChange={props.handleChange} section={props.section} />
            </CardContent>
        </Card>
    );
}






