'use client'
import { usePathname } from 'next/navigation';
import React from 'react'

import Menu from "../../components/menu/page"
import { Box } from '@mui/material';
export default function page() {
    const pathname = usePathname();

    console.log(pathname)
  return (
    <Box>

    <p>ldfljd</p>
    </Box>
  )
}
