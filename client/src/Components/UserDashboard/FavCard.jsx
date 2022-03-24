import React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import viaje from '../../Media/viaje.jpg';

export default function ActivityCard({ name, pictures, shorTDescription, price }) {
    return (
        <Card sx={{ maxWidth: 245, margin: '10px', padding: '10px' }}>
        <CardMedia
          component="img"
          height="140"
          alt="Turismo"
          image ={ viaje }
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Turismo {name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
           {shorTDescription} {"Viaja y conoce Latinoamerica con nosotros y maravillate con los impresionantes paisajes que tiene por descrubir".slice(0, 50)}... <a href="#">read more</a>
          </Typography>
        </CardContent>
        <CardActions style={{justifyContent: 'center'}} >
          <Button
          color="inherit"
          variant='outlined'
          size="small">Remove from itinerary</Button>
        </CardActions>
      </Card>
    );
};