import { Button } from '@/components/ui/button'
import React from 'react'

function CustomButton({title, icon, fun}) {
  return (
    <Button className="GreenButton dark p-1 gap-1" onClick={fun}>
    {icon()}
    {title}
  </Button>
  )
}

export default CustomButton