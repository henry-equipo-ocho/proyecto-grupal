import React from 'react'

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';

export default function Dashboard() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h5'>Dashboard</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          This is an info alert — <strong>check it out!</strong>
        </Alert>
      </Box>
    </Box>
  )
}
