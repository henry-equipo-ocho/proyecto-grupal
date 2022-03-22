import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import viaje from '../Media/viaje.jpg'


export default function ActivityCard({
    name, pictures, shorTDescription, price, handleDetail
}) {
    return (
        <Card sx={{ maxWidth: 345 }}>
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
           {shorTDescription} Viaja y conoce Latinoamerica con nosotros y maravillate con los impresionantes paisajes que tiene por descrubir
          </Typography>
        </CardContent>
        <CardActions style={{justifyContent: 'center'}} >
          <Button
          color="inherit"
          variant='outlined'
          onClick={handleDetail}
          size="small">Conoce mas</Button>
        </CardActions>
      </Card>
    );
};