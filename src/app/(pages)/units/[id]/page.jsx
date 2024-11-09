"use client"
import React from 'react'
import { useTranslation } from '@/app/context/TranslationContext';
import UpdateUnits from "@/app/components/units/UpdateUnits"
export default function Page() {
  const { t } = useTranslation();

  return (
    <div>
      <UpdateUnits  page="update"
          title={t("update_unit")}
          description={t("update_unit_description")}/>
    </div>
  )
}
