"use client";
import React from "react";
import { useTranslation } from "@/app/context/TranslationContext";

function Page() {
  const { t } = useTranslation();

  const demoData = [
    {
      id: 1,
      customerName: "أحمد محمد",
      phoneNumber: "0123456789",
      callDate: "2024-01-15",
      duration: "05:30",
      saved: true
    },
    {
      id: 2,
      customerName: "سارة احمد",
      phoneNumber: "0198765432",
      callDate: "2024-01-15",
      duration: "03:15",
      saved: false
    },
    {
      id: 3,
      customerName: "محمد علي",
      phoneNumber: "0123789456",
      callDate: "2024-01-14",
      duration: "08:45",
      saved: true
    },
    {
      id: 4,
      customerName: "فاطمة حسن",
      phoneNumber: "0145678923",
      callDate: "2024-01-14",
      duration: "02:20",
      saved: false
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full table-auto bg-white dark:bg-gray-800">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-right font-semibold text-gray-900 dark:text-white">#</th>
              <th className="px-6 py-3 text-right font-semibold text-gray-900 dark:text-white">{t('Client_name')}</th>
              <th className="px-6 py-3 text-right font-semibold text-gray-900 dark:text-white">{t('mobile_phone')}</th>
              <th className="px-6 py-3 text-right font-semibold text-gray-900 dark:text-white">{t('Last_Follow_up')}</th>
              <th className="px-6 py-3 text-right font-semibold text-gray-900 dark:text-white">{t('descriptions')}</th>
              <th className="px-6 py-3 text-right font-semibold text-gray-900 dark:text-white">{t('save')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {demoData.map((call) => (
              <tr key={call.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 text-right text-gray-900 dark:text-gray-200">{call.id}</td>
                <td className="px-6 py-4 text-right text-gray-900 dark:text-gray-200">{call.customerName}</td>
                <td className="px-6 py-4 text-right text-gray-900 dark:text-gray-200">{call.phoneNumber}</td>
                <td className="px-6 py-4 text-right text-gray-900 dark:text-gray-200">{call.callDate}</td>
                <td className="px-6 py-4 text-right text-gray-900 dark:text-gray-200">{call.duration}</td>
                <td className="px-6 py-4 text-right">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    call.saved 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  }`}>
                    {call.saved ? t('saved') : t('not_saved')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
