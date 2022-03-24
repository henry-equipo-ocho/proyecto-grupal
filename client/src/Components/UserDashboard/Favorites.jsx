import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Favorites() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant='h4' sx={{ marginTop: '15px', marginBottom: '10px' }}>Favorites</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Box sx={{ border: 'solid 1px black', padding: '20px', margin: '10px' }}>
          asdasdasd
        </Box>
        
      </Box>
    </Box>
  )
}
