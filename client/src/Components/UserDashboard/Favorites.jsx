import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import FavCard from './FavCard';

const iti = [[1, 2, 3], [2], [3, 2, 2, 2, 2], [2, 1]];

const getFavorites = async () => {
  try{
    console.log("Testing");
  }
  catch(e){

  }
};

export default function Favorites() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant='h4' sx={{ marginTop: '15px', marginBottom: '10px' }}>Favorites</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'column' }}>
      {
        iti.length 
        ? 
          iti.map((a, i) =>{
            return (
              <Accordion sx={{ my: 1 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography>Itinerary {i + 1}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column'}}>
                  <Button variant="outlined" size="small" sx={{ display: 'inline-block' }}>Remove itinerary</Button>
                  <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                  {a.map((act, i) => <FavCard key={i} />)}
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

