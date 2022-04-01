import React, { useState } from 'react';

import '../table.css';

import alert from 'sweetalert';

import axios from 'axios';

import { useFormik } from 'formik';
import * as yup from 'yup';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import MenuItem from '@mui/material/MenuItem';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';


import countries from '../../../Register/countries';

const validationSchema = yup.object({
  name: yup
    .string('Enter a name')
    .min(5, 'Name should be of minimum 5 characters length')
    .required('Name is required'),
  description: yup
    .string('Enter a description')
    .min(8, 'Description should be of minimum 8 characters length')
    .required('Description is required'),
  country: yup
    .string('Select country')
    .min(3, 'Enter a valid country')
    .required('Country is required'),
  picture: yup
    .string('Enter link of a picture')
    .min(2, 'Enter a valid link (more than 2 chars)')
    .required('Picture is required'),
  city: yup
    .string('Enter city')
    .min(2, 'City should be of minimum 2 characters length')
    .required('City is required'),
  price_currency: yup
    .string('Enter currency of Price')
    .required('Currency is required'),
  price_amount: yup
    .string('Entre price of activity')
    .required('Price is required'),
  booking: yup
    .string('Enter link of activity')
    .required('Link is required')
});

export default function Listar() {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);

  const [activities, setActivities] = useState([]);
  const [activityToFind, setActivityToFind] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      picture: '',
      city: '',
      country: '',
      price_currency: '',
      price_amount: '',
      booking: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post('http://localhost:3001/signup', values);
        alert("Success", "Activiry succesfully edited!", "success");
      }
      catch (e) {
        console.log(e)
        alert("Error", "" + e, "error")
      }
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setActivities([...activities, {
      _id: Math.random() * 10000,
      name: 'Viaje de 10 dias por toda Capital Federal',
      description: 'Un viaje increíble visitando los lugares turísticos mas importantes de Capital Federal',
      picture: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/87/aa/2f.jpg',
      country: 'Argentina',
      city: 'Buenos Aires',
      price_currency: 'ARS',
      price_amount: '30000',
      booking: 'https://www.google.com/'
    }])
  };

  const handleDetail = (_id, name, description, picture, city, country, price_currency, price_amount, booking) => {
    alert({
      title: name,
      text: `ID: ${_id}
      Description: ${description}
      Country: ${country}
      City: ${city}
      Currency: ${price_currency}
      Price: ${price_amount}`,
      icon: picture,
      buttons: [
        'Back',
        'Visit site'
      ],
    })
    .then(function (isConfirm) {
      if (isConfirm) {
        window.open(booking, '_blank');
      }
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
      <Typography variant='h5' sx={{ my: 2 }}>List activities</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <form method='POST' onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              sx={{ my: 1, width: '75vw' }}
              id="activityToFind"
              name="activityToFind"
              label="Activity to find"
              value={activityToFind}
              onChange={(e) => setActivityToFind(e.target.value)}
            />
            <Button type='submit' size='large' variant='contained' sx={{ mx: 1 }}>Search</Button>
          </Box>
        </form>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap' }}>
          {
            activities.length ?
              <Paper>
                <TableContainer>
                  <Table sx={{ minWidth: '83.6vw' }} size="small" aria-label="activities list table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">ID</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">City</TableCell>
                        <TableCell align="right">Currency</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Booking</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        activities
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((act) => (
                            <TableRow key={act._id} hover>
                              <TableCell align="left">{act._id}</TableCell>
                              <TableCell align="right">{act.name.slice(0, 20)}...</TableCell>
                              <TableCell align="right">{act.city}</TableCell>
                              <TableCell align="right">{act.price_currency}</TableCell>
                              <TableCell align="right">{act.price_amount}</TableCell>
                              <TableCell align="right">{act.booking}</TableCell>
                              <TableCell align="right">
                                <Button onClick={() => {
                                  setOpen(true)
                                  formik.setValues(
                                    {
                                      name: act.name,
                                      description: act.description,
                                      picture: act.picture,
                                      city: act.city,
                                      country: act.country,
                                      price_currency: act.price_currency,
                                      price_amount: act.price_amount,
                                      booking: act.booking
                                    }
                                  )
                                }}><EditIcon /></Button>
                                <Button onClick={() => handleDetail(
                                  act._id,
                                  act.name,
                                  act.description,
                                  act.picture,
                                  act.city,
                                  act.country,
                                  act.price_currency,
                                  act.price_amount,
                                  act.booking
                                )}><VisibilityIcon /></Button>
                              </TableCell>
                            </TableRow>
                          ))
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={activities.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
              :
              <Alert severity="info" sx={{ width: '100%', my: 2 }}>
                <AlertTitle>Found users</AlertTitle>
                All users will appear here.
              </Alert>
          }
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit data from {formik.values.name}</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Box>
              <TextField
                sx={{ my: 1, width: '100%' }}
                id="name"
                name="name"
                label="Activiy name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                sx={{ my: 1, width: '100%' }}
                id="desc"
                name="desc"
                label="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Box>
            <Box>
              <TextField
                sx={{ my: 1, width: '100%' }}
                id="pic"
                name="pic"
                label="Picture link"
                value={formik.values.picture}
                onChange={formik.handleChange}
                error={formik.touched.picture && Boolean(formik.errors.picture)}
                helperText={formik.touched.picture && formik.errors.picture}
              />
            </Box>
            <Box>
              <TextField
                sx={{ my: 1, width: '100%' }}
                id="city"
                name="city"
                label="City"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Box>
            <FormControl sx={{ my: 1, width: '100%' }}>
              <InputLabel id="country-select-label">Select country</InputLabel>
              <Select labelId="country-select-label"
                id="country"
                name="country"
                value={formik.values.country}
                defaultValue="Select country"
                label="Select country"
                onChange={formik.handleChange}
                error={formik.touched.country && Boolean(formik.errors.country)}
              >
                {countries.map(option => {
                  return (<MenuItem key={option.code} value={option.label}>
                    <img
                      width="20"
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt=""
                    />
                    {option.label}
                  </MenuItem>)
                })}
              </Select>
            </FormControl>
            <Box>
              <TextField
                sx={{ my: 1, width: '100%' }}
                id="currency"
                name="currency"
                label="Currency"
                value={formik.values.price_currency}
                onChange={formik.handleChange}
                error={formik.touched.price_currency && Boolean(formik.errors.price_currency)}
                helperText={formik.touched.price_currency && formik.errors.price_currency}
              />
            </Box>
            <Box>
              <TextField
                sx={{ my: 1, width: '100%' }}
                id="price"
                name="price"
                label="Price"
                value={formik.values.price_amount}
                onChange={formik.handleChange}
                error={formik.touched.price_amount && Boolean(formik.errors.price_amount)}
                helperText={formik.touched.price_amount && formik.errors.price_amount}
              />
            </Box>
            <Box>
              <TextField
                sx={{ my: 1, width: '100%' }}
                id="link"
                name="link"
                label="Link to Activity"
                value={formik.values.booking}
                onChange={formik.handleChange}
                error={formik.touched.booking && Boolean(formik.errors.booking)}
                helperText={formik.touched.booking && formik.errors.booking}
              />
            </Box>
            <Button
              sx={{ my: 1, width: '100%' }}
              color="primary"
              variant="contained"
              type="submit"
            >
              Create activity
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box >
  )
}
