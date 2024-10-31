'use client'
import { usePathname } from 'next/navigation';
import React from 'react'

import { Box } from '@mui/material';
export default function page() {
  const pathname = usePathname();

  console.log(pathname)
  return (
    <Box sx={{backgroundColor:"#f2f2f2", padding:"100px"}}>

      <p>welcome to our dashboard</p>
    </Box>
  )
}
