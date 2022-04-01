import React, { useState } from 'react';

import alert from 'sweetalert';

import Box from '@mui/material/Box';
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

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
export default function Remove() {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const [userToFind, setUserToFind] = useState('');
  const [usersFinded, setUsersFinded] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsersFinded([...usersFinded, { _id: '1232djkhasd' + Math.random() * 10000, name: 'pepe', surname: 'pepito', email: 'pepe@pepe.com' }])
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
    }).then(function (isConfirm) {
      if (isConfirm) {
        alert({
          title: 'Deleted!',
          text: 'User delete!',
          icon: 'success'
        }).then(function () {
          setUsersFinded(usersFinded.filter((user) => user._id !== _id));
        });
      } else {
        alert("Cancelled", "Action cancelled", "error");
      }
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
      <Typography variant='h5' sx={{ my: 2 }}>Remove user</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <form method='POST' onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              sx={{ my: 1, width: '75vw' }}
              id="userToFind"
              name="userToFind"
              label="User to find"
              value={userToFind}
              onChange={(e) => setUserToFind(e.target.value)}
            />
            <Button type='submit' size='large' variant='contained' sx={{ mx: 1 }}>Search</Button>
          </Box>
        </form>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap' }}>
          {
            usersFinded.length ?
              <Paper>
                <TableContainer>
                  <Table size="small" sx={{ minWidth: '83.6vw'}} aria-label="user list table">
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
                        usersFinded
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((user) => (
                            <TableRow key={user._id} hover>
                              <TableCell align="left">{user._id}</TableCell>
                              <TableCell align="right">{user.name}</TableCell>
                              <TableCell align="right">{user.surname}</TableCell>
                              <TableCell align="right">{user.email}</TableCell>
                              <TableCell align="right">
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
                  count={usersFinded.length}
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
    </Box>
  )
}
