import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import FavCard from './FavCard';

const iti = [[1, 2, 3], [2], [3, 2, 2, 2, 2], [2, 1]]

export default function Favorites() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant='h4' sx={{ marginTop: '15px', marginBottom: '10px' }}>Favorites</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      {
        iti.length 
        ? 
          iti.map((a, i) =>{
            return (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px', padding: '10px' }}>
                  <Typography variant='h5' sx={{ margin: '10px' }}>Itinerary {i + 1} <Button variant="outlined" size="small">Remove itinerary</Button></Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', border: '1px solid black', margin: '10px', padding: '10px' }}>
                  {
                    a.map((act, i) => <FavCard key={i} />)
                  }
                </Box>
              </Box>
            )
          })
        :
        <Typography variant='h4' sx={{ marginTop: '45px', marginBottom: '10px' }}>No favorites</Typography>
      }
      </Box>
    </Box>
  )
}

