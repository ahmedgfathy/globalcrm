"use client"
import { Box } from '@mui/material'
import React from 'react'
import AddUnits from '../../../components/units/AddUnits'
import { useTranslation } from '@/app/context/TranslationContext';
import UpdateUnits from "../../../components/units/UpdateUnits"
export default function page() {
  const { t } = useTranslation();

  return (
    <Box >
      <UpdateUnits  page="update"
          title={t("update_unit")}
          description={t("update_unit_description")}/>
    </Box>
  )
}
