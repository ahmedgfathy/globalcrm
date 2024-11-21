import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

function MainCardSetting({ title, description, content }) {
  return (
    <Card className="menu-drawer w-full h-max min-h-screen bg-Lightbg dark:bg-cardbgDark shadow-box_shadow dark:shadow-none py-4 overflow-x-hidden">
      <CardHeader className="text-2xl">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {content}
      </CardContent>
    </Card>
  );
}

export default MainCardSetting;
