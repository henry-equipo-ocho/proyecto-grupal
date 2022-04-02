import React, { useState } from 'react';

import Info from './About/Info';
import Snake from './About/Snake';

import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function About() {
  const [page, setPage] = useState(0);

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', paddingTop: '30px' }}>
      <Typography variant='h4' sx={{ mb: 1 }}>About Dashboard</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Alert severity="info" sx={{ width: '100%' }}>
          <AlertTitle>Users Panel</AlertTitle>
          <Typography variant='h5' sx={{ mb: 1 }}>If you have time, <strong>can press</strong> some button!</Typography>
        </Alert>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant='contained' sx={{ padding: '10px', margin: '20px' }} onClick={() => setPage(1)}>Option 1</Button>
          <Button variant='contained' sx={{ padding: '10px', margin: '20px' }} onClick={() => setPage(2)}>Option 2</Button>
        </Box>
        {
          page === 1 ?
            <Info />
            :
            page === 2 ?
              <Snake />
              :
              null
        }
      </Box>
    </Container>
  )
}

