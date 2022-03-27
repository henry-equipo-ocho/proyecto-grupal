import React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ActivityCard({ name, pictures, shorTDescription, price }) {
    return (
        <Card sx={{ maxWidth: 245, margin: '10px', padding: '10px' }}>
        <CardMedia
          component="img"
          height="140"
          alt="Turismo"
          image ={ pictures }
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
           {shorTDescription.slice(0, 50)}... <a href="#">read more</a>
          </Typography>
          <Typography variant="body1" color="text.secondary">
           {price}
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