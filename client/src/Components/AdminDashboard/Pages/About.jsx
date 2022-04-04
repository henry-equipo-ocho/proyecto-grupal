import React from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function About() {

  return (
    <center>
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '30px', background: 'white', margin: '10px', borderRadius: '5px' }}>
      <Typography variant='h4' sx={{ mb: 1 }}>About us</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant='h3' sx={{ mb: 1 }}>Eztinerary</Typography>
        <Typography sx={{ mb: 1 }}>This page is property of Henry-Equipo-Ocho.</Typography>

        <Typography variant='h4' sx={{ mt: 3 }}>The Team</Typography>

        <Typography sx={{ my: 1 }}><strong>Federico Lahoz</strong>: Front end Develper.</Typography>
        <Typography sx={{ my: 1 }}><strong>Camilo Cuervo</strong>: Front end Develper.</Typography>
        <Typography sx={{ my: 1 }}><strong>Carlos Alvarado</strong>: Front end Develper.</Typography>
        <Typography sx={{ my: 1 }}><strong>Ignacio Ramos</strong>: Back end Develper.</Typography>
        <Typography sx={{ my: 1 }}><strong>Alejo García</strong>: Back end Develper.</Typography>
        <Typography sx={{ my: 1 }}><strong>Mario Hernández</strong>: Back end Develper.</Typography>
        <Typography sx={{ my: 1 }}><strong>Axel Castillo</strong>: SCRUM Master.</Typography>

        <Typography variant='h5' sx={{ mt: 4 }}>Thanks for try our App!</Typography>
        <Typography variant='h6' sx={{ mt: 4, mb: 4 }}>Then delight yourself with a beautiful creation!</Typography>

        <iframe width="560" height="315" src="https://www.youtube.com/embed/DKFS2tDsZRY?controls=1&autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen autoPlay></iframe>

        <a href='https://www.freepik.es/vectores/memphis' style={{ margin: '20px' }}>Créditos imagen de fondo</a>
      </Box>
    </Container>
    </center>
  )
}

