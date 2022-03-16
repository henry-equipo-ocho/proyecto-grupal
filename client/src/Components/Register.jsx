import React, { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Container } from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';

export default function InputAdornments() {
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }} >
        <Box>
          <h1 style={{ fontWeight: '300', fontSize: '60px' }}>
            Register at <br />
            <span style={{ fontWeight: '400', fontSize: '32px', position: 'relative', top: '-50px', left: '0px'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Eztinerary</span>
          </h1>
          <p style={{ position: 'relative', top: '-50px', left: '0px', fontSize: '18px' }}>
            Disfrutarás de beneficios como:
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} aria-label="contacts">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <StarIcon color='success' />
                  </ListItemIcon>
                  <ListItemText primary="Tener una lista de itinerarios favoritos" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <StarIcon color='success' />
                  </ListItemIcon>
                  <ListItemText primary="Búsqueda más personalizada en base a tus preferencias" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <StarIcon color='success' />
                  </ListItemIcon>
                  <ListItemText primary="¡Entre muchos más!" />
                </ListItemButton>
              </ListItem>
              
            </List>
            <Button variant='contained'>Conocer más beneficios</Button>
          </p>
        </Box>
        <Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', marginTop: '50px' }}>
            <FormControl sx={{ m: 1, width: 'auto' }} variant="outlined">
              <InputLabel htmlFor="name">Name</InputLabel>
              <OutlinedInput
                id="name"
                type='text'
                value={values.password}
                onChange={handleChange('password')}
                label="Name"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: 'auto' }} variant="outlined">
              <InputLabel htmlFor="surname">Surname</InputLabel>
              <OutlinedInput
                id="surname"
                type='text'
                value={values.password}
                onChange={handleChange('password')}
                label="Surname"
              />
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <FormControl sx={{ m: 1, width: 'auto' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}