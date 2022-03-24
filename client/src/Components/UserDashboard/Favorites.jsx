import React from 'react';

import viaje from '../Media/viaje.jpg'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

export default function Favorites() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant='h4' sx={{ marginTop: '15px', marginBottom: '10px' }}>Favorites</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      <Card sx={{ maxWidth: 345, padding: '10px', margin: '10px' }}>
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
        
      </Box>
    </Box>
  )
}

