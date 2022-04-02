import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Snake() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant='h5'>Snake Game!</Typography>
      <canvas id="stage" height="400" width="520"></canvas>
    </Box>
  )
}
