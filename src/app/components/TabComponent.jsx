import { Grid, Tab, Tabs } from '@mui/material'
import React from 'react'

function TabComponent({ele, selectedTab, handleTabChange}) {
  return (
    <Grid item xs={3} md={2} className="bg-Lightbg dark:bg-cardbgDark my-2 rounded-md max-sm:hidden">
    <Tabs
      orientation="vertical"
      value={selectedTab}
      onChange={handleTabChange}
      aria-label="Vertical tabs"
      TabIndicatorProps={{
        style: {
          backgroundColor: "#4CAF50",
        },
      }}
      style={{ height: '100%', paddingTop: 16 }}
    >
        {ele?.map((ele, i)=>{
            return(
                <Tab
                key={i}
                  label={ele}
                  sx={{
                    color: "#5be49b",
                    "&.Mui-selected": {
                      color: "#5be49b",
                      backgroundColor: "rgba(91, 228, 155, 0.1)"
                    },
                  }}
                />

            )
        })}
    </Tabs>
  </Grid>
  )
}

export default TabComponent