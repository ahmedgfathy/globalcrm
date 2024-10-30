'use client'
import { usePathname } from 'next/navigation';
import React from 'react'

import { Box } from '@mui/material';
export default function page() {
  const pathname = usePathname();

  console.log(pathname)
  return (
    <Box sx={{backgroundColor:"red", padding:"100px"}}>

      <p>ldfljdmdanfdksdkjdsakjkjfekjwkjrjejwrlkjewkjrelkwjejwkjlerwjlewjjewljkrejklejwlkjweljeljew</p>
    </Box>
  )
}
