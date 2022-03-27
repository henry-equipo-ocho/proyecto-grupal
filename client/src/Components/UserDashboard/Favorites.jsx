import React, { useEffect } from 'react';

import axios from 'axios';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import FavCard from './FavCard';

let iti = [];

const getFavorites = async () => {
  try{
    const token = JSON.parse(localStorage.getItem('token'));
    const id = JSON.parse(localStorage.getItem('data')).id;
    const response = await axios.get('http://localhost:3001/favorites/' + id, 
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    iti = [...response.data.data];
  }
  catch(e){
    console.log(e)
  }
};

export default function Favorites() {
  
  useEffect(() => {
    getFavorites();
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant='h4' sx={{ marginTop: '15px', marginBottom: '10px' }}>Favorites</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'column' }}>
      {
        iti.length 
        ? 
          iti.map((a, i) =>{
            return (
              <Accordion key={i} sx={{ my: 1, width: '100vw' }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography>Itinerary {i + 1}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column'}}>
                  <Button variant="outlined" size="small" sx={{ display: 'inline-block' }}>Remove itinerary</Button>
                  <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                  {/* {a.map((act, i) => <FavCard key={i} />)} */}
                  </Box>
                </AccordionDetails>
              </Accordion>
            )
          })
        :
        <Typography variant='h4' sx={{ marginTop: '45px', marginBottom: '10px' }}>No favorites</Typography>
      }
      </Box>
    </Box>
  )
}

