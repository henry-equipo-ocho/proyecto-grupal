import React, { useState, useEffect } from 'react';

import '../loader.css';
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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import countries from '../../../Register/countries';

const validationSchema = yup.object({
  name: yup
    .string('Enter your name')
    .min(2, 'Name should be of minimum 8 characters length')
    .required('Name is required'),
  surname: yup
    .string('Enter your surname')
    .min(2, 'Surname should be of minimum 8 characters length')
    .required('Surname is required'),
  country: yup
    .string('Select your country')
    .min(3, 'Enter a valid country')
    .required('Country is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
});

export default function Listar() {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState([]);
  const [usersBackup, setUsersBackup] = useState([]);
  const [userToFind, setUserToFind] = useState('');
 
  useEffect(() => {
    setLoading(true);
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const datos = await axios.get('http://localhost:3001/admin/users', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      setUsers(datos.data.data);
      setUsersBackup(datos.data.data);
      setLoading(false);
    }
    catch (e) {
      alert("Error", `Error to load users (${e})`, "error");
    }
  };

  const handleDetail = (_id, name, surname, email, country, subscribed, verified) => {
    alert(`Detail of ${name} ${surname}`, `ID: ${_id}
    Name: ${name}
    Surname: ${surname}
    Email: ${email}
    Country: ${country}
    Subscribed: ${subscribed}
    Verified: ${verified}`)
  };

  const handleDelete = (_id) => {
    alert({
      title: "Are you sure?",
      text: "You will not be able to recover this user!",
      icon: "warning",
      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      dangerMode: true,
    }).then(async function (isConfirm) {
      if (isConfirm) {
          try {
            const token = JSON.parse(localStorage.getItem('token'));
            await axios.delete('http://localhost:3001/admin/delete/user', {
              headers: {
                "Authorization": `Bearer ${token}`
              },
              data: {
                id: _id
              }
            });
            alert("Success", "User succesfully deleted!", "success");
            setOpen(false);
            setLoading(true);
            loadUsers();
          }
          catch (e) {
            console.log(e)
            alert("Error", "" + e, "error")
          }
      } else {
        alert("Cancelled", "Action cancelled", "error");
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      surname: '',
      country: '',
      email: '',
      password: '',
      activeSubscription: false
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const token = JSON.parse(localStorage.getItem('token'));
        await axios.put('http://localhost:3001/admin/update/user', values, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        alert("Success", "User succesfully edited!", "success");
        setOpen(false);
        setLoading(true);
        loadUsers();
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
  };

  const searchUser = () => {
    handleChangePage(null, 0);
    const users_data = usersBackup.filter((user) => (user.name + ' ' + user.surname).toLowerCase().includes(userToFind.toLowerCase()));
    setUsers(users_data);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
      <Typography variant='h5' sx={{ my: 2 }}>List users</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <form method='POST' onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              sx={{ my: 1, width: '75vw' }}
              id="userToFind"
              name="userToFind"
              label="Find user by name"
              value={userToFind}
              onChange={(e) => setUserToFind(e.target.value)}
            />
            <Button type='submit' size='large' variant='contained' sx={{ mx: 1 }} onClick={searchUser}>Search</Button>
          </Box>
        </form>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap' }}>
          {
            !loading ?
              users.length ?
                <Paper>
                  <TableContainer>
                    <Table sx={{ minWidth: '83.6vw' }} size="small" aria-label="user list table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">ID</TableCell>
                          <TableCell align="right">Name</TableCell>
                          <TableCell align="right">Surname</TableCell>
                          <TableCell align="right">Email</TableCell>
                          <TableCell align="right">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          users
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((user) => (
                              <TableRow key={user._id} hover>
                                <TableCell align="left">{user._id}</TableCell>
                                <TableCell align="right">{user.name}</TableCell>
                                <TableCell align="right">{user.surname}</TableCell>
                                <TableCell align="right">{user.email}</TableCell>
                                <TableCell align="right">
                                  <Button onClick={() => {
                                    setOpen(true)
                                    formik.setValues(
                                      {
                                        id: user._id,
                                        name: user.name,
                                        surname: user.surname,
                                        country: user.country,
                                        email: user.email,
                                        password: '',
                                        activeSubscription: user.activeSubscription
                                      }
                                    )
                                  }}><EditIcon /></Button>
                                  <Button onClick={() => handleDetail(user._id, user.name, user.surname, user.email, user.country, user.activeSubscription, user.isVerified)}><VisibilityIcon /></Button>
                                  <Button onClick={() => handleDelete(user._id)}><DeleteOutlineIcon /></Button>
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
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={() => {
                      setLoading(true);
                      loadUsers();
                    }}>Reload users</Button>
                  </Box>
                </Paper>
                :
                <Alert severity="info" sx={{ width: '100%', my: 2 }}>
                  <AlertTitle>Found users</AlertTitle>
                  All users will appear here.
                  <Button onClick={() => {
                    setLoading(true);
                    loadUsers();
                  }}>Reload users</Button>
                </Alert>
              :
              <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
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
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                sx={{ my: 1, width: '100%' }}
                id="surname"
                name="surname"
                label="Surname"
                value={formik.values.surname}
                onChange={formik.handleChange}
                error={formik.touched.surname && Boolean(formik.errors.surname)}
                helperText={formik.touched.surname && formik.errors.surname}
              />
            </Box>
            <Box>
              <TextField
                sx={{ my: 1, width: '100%' }}
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Box>
            <Box>
              <TextField
                sx={{ my: 1, width: '100%' }}
                id="password"
                name="password"
                label="Password"
                type='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
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
            <FormControl sx={{ my: 1, width: '100%' }}>
              <InputLabel id="subs-select-label">Select subscription type</InputLabel>
              <Select labelId="subs-select-label"
                id="activeSubscription"
                name="activeSubscription"
                value={formik.values.activeSubscription}
                defaultValue={false}
                label="Select subscription type"
                onChange={formik.handleChange}
                error={formik.touched.activeSubscription && Boolean(formik.errors.activeSubscription)}
              >
                <MenuItem value={false}>
                  No
                </MenuItem>
                <MenuItem value={true}>
                  Yes
                </MenuItem>
              </Select>
            </FormControl>
            <Button
              sx={{ my: 1, width: '100%' }}
              color="primary"
              variant="contained"
              type="submit"
            >
              Edit user
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
