import React from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function About() {

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', paddingTop: '30px' }}>
      <Typography variant='h4' sx={{ mb: 1 }}>About Dashboard</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      </Box>
    </Container>
  )
}

