import React, { useState } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

export default function Users() {
  const [page, setPage] = useState('index');

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', paddingTop: '30px' }}>
      <Typography variant='h4' sx={{ mb: 1 }}>Users Dashboard</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: '10px' }}>
        {page === 'index' ?
          <Card sx={{ margin: '10px' }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                <PersonAddAltIcon sx={{ fontSize: '35px' }} />
              </Typography>
              <Typography variant="h5" component="div">
                Add user
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                If you want to add a user in the database, click on the link
                <br />
                click on the link.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => setPage('add')}>View Panel</Button>
            </CardActions>
          </Card>
          :
          page === 'add' ?
            <Box>
              <Button onClick={() => setPage('index')}>Back</Button>
            </Box>
            :
            page === 'remove' ?
              <Box>
                <Button onClick={() => setPage('index')}>Back</Button>
              </Box>
              :
              page === 'list' ?
                <Box>
                  <Button onClick={() => setPage('index')}>Back</Button>
                </Box>
                :
                null
        }
      </Box>
    </Container>
  )
}
