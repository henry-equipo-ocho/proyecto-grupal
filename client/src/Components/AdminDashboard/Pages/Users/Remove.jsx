import React, { useState } from 'react';

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
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
export default function Remove() {

  const [userToFind, setUserToFind] = useState('');
  const [usersFinded, setUsersFinded] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsersFinded([...usersFinded,  {_id: '1232djkhasd', name: 'pepe', surname: 'pepito', email: 'pepe@pepe.com'}])
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
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: '83.6vw' }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">ID</TableCell>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right">Surname</TableCell>
                      <TableCell align="right">Email</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {usersFinded?.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell align="left">{user._id}</TableCell>
                        <TableCell align="right">{user.name}</TableCell>
                        <TableCell align="right">{user.surname}</TableCell>
                        <TableCell align="right">{user.email}</TableCell>
                        <TableCell align="right"><Button><DeleteOutlineIcon /></Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              :
              <Alert severity="info" sx={{ width: '100%', my: 2 }}>
                <AlertTitle>Found users</AlertTitle>
                All the users that match your search will appear here.
              </Alert>
          }
        </Box>
      </Box>
    </Box>
  )
}
