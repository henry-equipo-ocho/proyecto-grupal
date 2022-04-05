import React from 'react';
import sweetAlert from 'sweetalert';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useAxiosPrivate } from '../Auth/useAxiosPrivate';

export default function ActivityCard({ name, pictures, shorTDescription, price, currency, link, loadFavs, actID, itName }) {

  const axiosPrivate = useAxiosPrivate();

  const remove = async (activityID, itineraryName) => {
    try {
      
      await axiosPrivate.delete('/favorites', 
        {
          data: {
            activityID,
            itineraryName,
          }
        }
      );
      sweetAlert('Congrats', `Activity "${name.slice(0, 15)}..." deleted from itinerary "${itName}"`, 'success')
    }
    catch (e) {
      sweetAlert("Error", "" + e, 'error')
    }
    loadFavs();
  }

  return (
    <Card sx={{ maxWidth: 300, margin: '10px', padding: '10px', border: 'solid 1px #CAE5CB' }}>
      <CardMedia
        component="img"
        height="130"
        alt="Turismo"
        sx={{ borderRadius: '5px' }}
        image={pictures}
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography gutterBottom variant="h6" component="div">
          {name}
        </Typography>
        <Typography color="text.secondary">
          {shorTDescription.slice(0, 50)}... <a href={link} target='_blank' rel="noreferrer">read more</a>
        </Typography>
        <Typography variant="body1">
          Price: {price} {currency}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: 'center' }} >
        <Button
          color='error'
          variant='contained'
          size="small"
          onClick={() => remove(actID, itName)}
          >Remove from itinerary</Button>
      </CardActions>
    </Card>
  );
};