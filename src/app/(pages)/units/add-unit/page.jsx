"use client"
import React from 'react'
import { useTranslation } from '@/app/context/TranslationContext';
import AddUnits from "@/app/components/units/AddUnits"

export default function Page() {
    const { t } = useTranslation();
    return (
    <div>
        <AddUnits  page="add"
          title={t("add_unit")}
          description={t("add_unit_description")}/>
    </div>
  )
}