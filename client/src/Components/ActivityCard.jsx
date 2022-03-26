import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ActivityCard({
    nombre, imagen, handleDetail, id
}) {
  console.log(id)
    return (
        <Card sx={{ maxWidth: 400, border: 1 }}>
        <CardMedia
          component="img"
          height="300"
          alt="Turismo"
          image ={imagen}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {nombre}
          </Typography>
        </CardContent>
        <CardActions style={{justifyContent: 'center'}} >
          <Button
          color="inherit"
          variant='outlined'
          onClick={() => handleDetail(id)}
          size="small">Conoce mas</Button>
        </CardActions>
      </Card>
    );
};