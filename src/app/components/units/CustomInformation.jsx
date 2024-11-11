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
            label: 'Property Offered By',
            idField: 'propertyOfferedBy',
            defaultValue: page !== "add" ? 'مالك' : "",
            options: [
                { value: 'مالك', label: 'مالك' },
                { value: 'مسؤول طرف المالك', label: 'مسؤول طرف المالك' },
                { value: 'مكتب عقاري', label: 'مكتب عقاري' },
                { value: 'حارس العقار', label: 'حارس العقار' }
            ],
        },
        { id: 2, type: 'input', label: 'Name', idField: 'name', defaultValue: page !== "add" ? "khalid" : "" },
        { id: 3, type: 'input', label: 'Unit No.', idField: 'unitNo', defaultValue: page !== "add" ? "1010" : "" },
        {
            id: 4,
            type: 'select',
            label: '4 Update',
            idField: 'update',
            defaultValue: page !== "add" ? 'New rented' : "",
            options: [
                { value: 'Want Upadate', label: 'Want Upadate' },
                { value: 'Hidden', label: 'Hidden' }
            ],
        },
        { id: 5, type: 'input', label: 'Mobile No.', idField: 'mobileNo', defaultValue: page !== "add" ? "01087559165" : "" },
        { id: 6, type: 'input', label: 'Tel', idField: 'tel', defaultValue: page !== "add" ? "" : "" },
        {
            id: 7,
            type: 'select',
            label: 'Update Calls',
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
        <Card className="menu-drawer w-full h-max bg-Lightbg dark:bg-cardbgDark shadow-box_shadow dark:shadow-none pb-4 pt-2 overflow-x-auto">
            <div className="header w-full flex justify-between items-center pb-4">
                <p className="text-xl font-bold">Custom Information</p>
            </div>
            <CardContent className="w-full min-w-max overflow-x-auto" dir="rtl">
                <FormFields fields={fieldsData} isDisabled={isDisabled} />
            </CardContent>
        </Card>
    );
}






