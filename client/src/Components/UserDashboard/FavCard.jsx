import React from 'react';
import axios from 'axios';
import sweetAlert from 'sweetalert';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ActivityCard({ name, pictures, shorTDescription, price, currency, link, loadFavs, actID, itName }) {
  const remove = async (activityID, itineraryName) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      await axios.delete('http://localhost:3001/favorites',
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
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
    <Card sx={{ maxWidth: 245, margin: '10px', padding: '10px' }}>
      <CardMedia
        component="img"
        height="140"
        alt="Turismo"
        image={pictures}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {shorTDescription.slice(0, 50)}... <a href={link} target='_blank' rel="noreferrer">read more</a>
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Price: {price} {currency}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: 'center' }} >
        <Button
          color="inherit"
          variant='outlined'
          size="small"
          onClick={() => remove(actID, itName)}
          >Remove from itinerary</Button>
      </CardActions>
    </Card>
  );
};