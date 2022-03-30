import React from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function Activities() {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', paddingTop: '30px' }}>
      <Typography variant='h4' sx={{ mb: 1 }}>Activities Dashboard</Typography>
    </Container>
  )
}
