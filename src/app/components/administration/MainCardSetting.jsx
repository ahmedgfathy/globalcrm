import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import CustomButton from '../CustomButton';

function MainCardSetting({ title, description, content,handleSubmit }) {
  return (
    <Card className="menu-drawer w-full h-max min-h-screen bg-Lightbg dark:bg-cardbgDark shadow-box_shadow dark:shadow-none py-4 overflow-x-hidden">
      <CardHeader className="text-2xl flex justify-between w-full flex-row">
        <div>
        <CardTitle className="pb-1 font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        </div>
        <div>
          <CustomButton
          title="Save"
          fun={handleSubmit}
          />
        </div>
      </CardHeader>
      <CardContent>
        {content}
      </CardContent>
    </Card>
  );
}

export default MainCardSetting;
