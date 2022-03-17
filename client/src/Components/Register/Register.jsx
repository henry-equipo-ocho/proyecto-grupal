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
import GoogleIcon from '@mui/icons-material/Google';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import countries from './countries';

export default function Register() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('')

  const [values, setValues] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    country: '',
    terms: false,
    showPassword: false,
  });

  const [error, setError] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    country: '',
    terms: false
  });

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("OK");
    }
  }

  const handleChange = (prop) => (event, country) => {
    switch (prop) {
      case 'name': {
        setError({
          ...error,
          'name': event.target.value.length > 2 ? '' : 'Error con el name'
        })
        break;
      }

      case 'surname': {
        setError({
          ...error,
          'surname': event.target.value.length > 2 ? '' : 'Error con el surname'
        })
        break;
      }

      case 'email': {
        setError({
          ...error,
          'email': event.target.value.length > 5 && event.target.value.includes('@') ? '' : 'Error con el email'
        })
        break;
      }

      case 'password': {
        setError({
          ...error,
          'password': event.target.value.length > 5 ? '' : 'Error con el password'
        })
        break;
      }
      default: { break; }
    }

    setValues({ ...values, [prop]: country ? country.label.length ? country.label : '' : event.target.value });
  };

  const validateForm = () => {
    let validado = true;

    const { name, surname, email, password, country, terms } = values;

    if (!name.length || error.name.length) {
      validado = false;
    }

    if (!surname.length || error.surname.length) {
      validado = false;
    }

    if (!email.length || error.email.length) {
      validado = false;
    }

    if (!password.length || error.password) {
      validado = false;
    }

    if (!country || error.country || !country.length) {
      validado = false;
    }

    if (!terms) {
      validado = false;
    }

    if (!validado) return setOpen(true);

    return validado;
  }

  const handleClose = () => {
    setOpen(false);
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
            <Button variant='contained' color='primary'>Conocer más beneficios</Button>
          </Box>
        </Box>
        <Box>
          <Alert severity="info">All fields are required</Alert>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" focused>
              <InputLabel htmlFor="name" color='primary'>Name</InputLabel>
              <OutlinedInput
                color={error.name.length ? 'error' : 'primary'}
                placeholder='Name'
                id="name"
                type='text'
                value={values.name}
                onChange={handleChange('name')}
                label="Name"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" focused>
              <InputLabel htmlFor="surname" color='primary'>Surname</InputLabel>
              <OutlinedInput
                color={error.surname.length ? 'error' : 'primary'}
                placeholder='Surname'
                id="surname"
                type='text'
                value={values.surname}
                onChange={handleChange('surname')}
                label="Surname"
              />
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" focused>
              <InputLabel htmlFor="email" color='primary'>Email</InputLabel>
              <OutlinedInput
                color={error.email.length ? 'error' : 'primary'}
                placeholder='Email@email.com'
                id="email"
                type='email'
                value={values.email}
                onChange={handleChange('email')}
                label="Email"
              />
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" focused>
              <Autocomplete
                id="country"
                color='primary'
                options={countries}
                autoHighlight
                isOptionEqualToValue={e => e.label}
                getOptionLabel={(option) => option.label || values.country}
                onChange={handleChange('country')}
                value={values.country}
                inputValue={inputValue}
                onInputChange={(_, newInputValue) => {
                  setInputValue(newInputValue)
                }}
                renderOption={(props, option) => (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                      key={option.label}
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
                    focused
                    sx={{ "& input::-webkit-clear-button": { display: "none" } }}
                    {...params}
                    color='primary'
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
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" focused>
              <InputLabel htmlFor="password" color='primary'>Password</InputLabel>
              <OutlinedInput
                id="password"
                color={error.password.length ? 'error' : 'primary'}
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
          <Box sx={{ textAlign: 'center' }}>
            <FormControlLabel control={<Checkbox color='primary' id='terms' onChange={e => {
              setError({
                ...error,
                terms: values.terms ? 'You need accept terms and conditions.' : ''
              })
              setValues({ ...values, terms: e.target.checked })
            }
            } />} label="I accept the terms and conditions" color={error.name.length ? 'error' : ''} />
          </Box>
          <Box sx={{ textAlign: 'center', marginBottom: '25px' }}>
            <Button color='primary' variant='contained' type='submit' onClick={handleSubmit}>
              Register
            </Button>
          </Box>
          <Box sx={{border: '1px dotted blue', marginBottom: '25px', padding: '10px'}}>
            <Box sx={{ textAlign: 'center', marginBottom: '10px' }}>
              <span>OR</span>
            </Box>
            <Box sx={{ textAlign: 'center', marginBottom: '10px' }}>
              <Button variant='outlined'>
                Register with&nbsp;&nbsp;<GoogleIcon />
              </Button>
            </Box>
            <Box sx={{ textAlign: 'center', marginBottom: '10px' }}>
              <span>OR</span>
            </Box>
            <Box sx={{ textAlign: 'center', marginBottom: '10px' }}>
              <span>Do you have an account?&nbsp;&nbsp;
                <Button variant='outlined'>
                  LOGIN
                </Button>
              </span>
            </Box>
          </Box>
        </Box>
        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Error"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              You need complete form or check inputs
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Check</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}