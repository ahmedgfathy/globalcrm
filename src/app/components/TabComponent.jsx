import { Grid, Tab, Tabs, useMediaQuery } from '@mui/material';
import React from 'react';

function TabComponent({ ele, selectedTab, handleTabChange }) {
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <Grid
      item
      xs={12}
      md={2}
      className={`bg-Lightbg dark:bg-cardbgDark my-2 rounded-md ${
        isSmallScreen ? '' : 'max-sm:hidden'
      }`}
    >
      <Tabs
        orientation={isSmallScreen ? 'horizontal' : 'vertical'} 
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="Tabs"
        TabIndicatorProps={{
          style: {
            backgroundColor: '#4CAF50',
          },
        }}
        style={{
          width: '100%',
          paddingTop: isSmallScreen ? 0 : 16, 
        }}
      >
        {ele?.map((ele, i) => {
          return (
            <Tab
              key={i}
              label={ele}
              sx={{
                color: '#5be49b',
                '&.Mui-selected': {
                  color: '#5be49b',
                  backgroundColor: 'rgba(91, 228, 155, 0.1)',
                },
              }}
            />
          );
        })}
      </Tabs>
    </Grid>
  );
}

export default TabComponent;
