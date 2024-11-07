import { Box } from '@mui/material'
import React from 'react'
import AddUnits from '../../../components/units/AddUnits'

export default function page() {
  return (
    <Box >
      <AddUnits  page="add"
          title={t("add_unit")}
          description={t("add_unit_description")}/>
    </Box>
  )
}
