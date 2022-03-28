import React, { useEffect, useState } from 'react';

import sweetAlert from 'sweetalert';

import axios from 'axios';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { Link } from 'react-router-dom';

import FavCard from './FavCard';

export default function Favorites() {
  const [iti, setIti] = useState([]);

  const remove = async (itineraryName) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
        await axios.delete('http://localhost:3001/favorites',
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          data:{
            itineraryName,
          }
        });
        sweetAlert('Congrats', `Itinerary "${itineraryName}" deleted!`, 'success')
      }  
    catch (e) {
      sweetAlert('Error', " " + e, 'error')
    }
    getFavorites();
  }
  
  const getFavorites = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await axios.get('http://localhost:3001/favorites/',
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      setIti([...response.data.data]);
    }
    catch (e) {
      console.log(e)
    }
  };
  
  useEffect(() => {
    getFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant='h4' sx={{ marginTop: '15px', marginBottom: '10px' }}>Favorites</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'column' }}>
        {
          iti.length
            ?
            iti.map((itinerary) => {
              return (
                <Accordion key={itinerary.name} sx={{ my: 1, width: '100vw' }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography>{itinerary.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Button variant="outlined" size="small" sx={{ display: 'inline-block' }} onClick={() => remove(itinerary.name)}>Remove itinerary</Button>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      {
                        itinerary.activities.length ? 
                          itinerary.activities.map((act, i) => <FavCard 
                          key={act._id} 
                          shorTDescription={act.description} 
                          link={act.booking} 
                          name={act.name} 
                          price={act.price_amount} 
                          currency={act.price_currency} 
                          actID={act._id} 
                          itName={itinerary.name}
                          pictures={act.picture}
                          loadFavs={getFavorites}
                          />)
                        :
                        <Alert severity="error" sx={{ width: '100%', my: 1 }}>
                          <AlertTitle>Activities</AlertTitle>
                          No activities to display — <strong><Link to='/home' style={{ textDecoration: 'none' }}><Button>Try add activities here!</Button></Link></strong>
                        </Alert>
                      }
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

