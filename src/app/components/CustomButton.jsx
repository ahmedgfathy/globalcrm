import { Button } from '@/components/ui/button'
import React from 'react'

function CustomButton({title, icon, fun, className = "GreenButton"}) {
  return (
    <Button className={`${className} dark p-1 gap-1`} onClick={fun}>
    {icon && icon()}
    {title}
  </Button>
  )
}

export default CustomButton