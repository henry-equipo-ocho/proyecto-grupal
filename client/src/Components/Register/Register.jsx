import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel'
import { Container } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import countries from './countries';
import NavBar from '../NavBar'

export default function InputAdornments() {
  const [values, setValues] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
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
  
    <Container sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'center' }}>
       <NavBar />
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', marginTop: '70px' }} >
        <Box>
          <h1 style={{ fontWeight: '300', fontSize: '60px' }}>
            Register at <br />
            <span style={{ fontWeight: '400', fontSize: '29px', position: 'relative', top: '-45px', left: '0px' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Eztinerary</span>
          </h1>
          <Box style={{ position: 'relative', top: '-50px', left: '0px', fontSize: '18px' }}>
            Disfrutarás de beneficios como:
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} aria-label="beneficios">
              <ListItem disablePadding>
                <ListItemIcon>
                  <StarIcon color='success' />
                </ListItemIcon>
                <ListItemText primary="Tener una lista de itinerarios favoritos" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <StarIcon color='success' />
                </ListItemIcon>
                <ListItemText primary="Búsqueda más personalizada en base a tus preferencias" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <StarIcon color='success' />
                </ListItemIcon>
                <ListItemText primary="¡Entre muchos más!" />
              </ListItem>
            </List>
            <Button variant='contained'>Conocer más beneficios</Button>
          </Box>
        </Box>
        <Box>
          <Alert severity="warning">All fields are required</Alert>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
              <InputLabel htmlFor="name" color='secondary'>Name</InputLabel>
              <OutlinedInput
                color='secondary'
                id="name"
                type='text'
                value={values.name}
                onChange={handleChange('name')}
                label="Name"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
              <InputLabel htmlFor="surname" color='secondary'>Surname</InputLabel>
              <OutlinedInput
                color='secondary'
                id="surname"
                type='text'
                value={values.surname}
                onChange={handleChange('surname')}
                label="Surname"
              />
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
              <InputLabel htmlFor="email" color='secondary'>Email</InputLabel>
              <OutlinedInput
                color='secondary'
                id="email"
                type='email'
                value={values.email}
                onChange={handleChange('email')}
                label="Email"
              />
            </FormControl>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
              <Autocomplete
                id="country-select"
                color='secondary'
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt=""
                    />
                    {option.label}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    color='secondary'
                    label="Nationality (Choose a country)"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'country-select', // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password" color='secondary'>Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                color='secondary'
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
          <Box sx={{textAlign: 'center'}}>
            <FormControlLabel control={<Checkbox color='secondary' defaultChecked />} label="I accept the terms and conditions" />
          </Box>
          <Box sx={{textAlign: 'center', marginBottom: '25px'}}>
            <Button color='secondary' variant='contained' component={Link} to='/'>
              Register
            </Button>
          </Box>
        </Box>
      </Box>
    </Container >
  );
}