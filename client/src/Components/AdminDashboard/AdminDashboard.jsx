import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { ProviderContext } from './Context/context'

import { useNavigate } from 'react-router-dom';

import Dashboard from './Pages/Dashboard';
import About from './Pages/About';
import Actividades from './Pages/Actividades';
import Estadisticas from './Pages/Estadisticas';
import Users from './Pages/Users';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import MenuIcon from '@mui/icons-material/Menu';
import LinkIcon from '@mui/icons-material/Link';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import GroupIcon from '@mui/icons-material/Group';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import BarChartIcon from '@mui/icons-material/BarChart';

export default function AdminDashboard() {
  const history = useNavigate();
  
  const verify = async () => {
    try{
      const token = JSON.parse(localStorage.getItem('token'));
      await axios.post('http://localhost:3001/admin/token', {
        token
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log('hola admin!')
    }
    catch(e){
      history('/home');
    }
  };

  useEffect(() => {
    verify();
  }, []);

  const [state, setState] = useState(false);

  const [page, setPage] = useState('dashboard');

  const reducer = (action, payload) => {
    if (action === 'SET_PAGE') {
      setPage(payload)
    }
  }

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button onClick={() => history('/home')}>
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
          <ListItemText primary='Go to Home' />
        </ListItem>
        <ListItem button onClick={() => history('/')}>
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
          <ListItemText primary='Go to Landing Page' />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => setPage('dashboard')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary='Dashboard' />
        </ListItem>
        <ListItem button onClick={() => setPage('users')}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary='Users' />
        </ListItem>
        <ListItem button onClick={() => setPage('actividades')}>
          <ListItemIcon>
            <LocalActivityIcon />
          </ListItemIcon>
          <ListItemText primary='Activities' />
        </ListItem>
        <ListItem button onClick={() => setPage('estadisticas')}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary='Statistics' />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => setPage('about')}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary='About' />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box>
      <Box>
        <Button onClick={toggleDrawer(true)} sx={{ position: 'absolute' }} color='inherit'><MenuIcon /></Button>
        <SwipeableDrawer
          anchor='left'
          open={state}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {list()}
        </SwipeableDrawer>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <ProviderContext value={{ page, reducer }} >
        { page === 'dashboard' ? <Dashboard /> : null }
        { page === 'about' ? <About /> : null }
        { page === 'actividades' ? <Actividades /> : null }
        { page === 'estadisticas' ? <Estadisticas /> : null }
        { page === 'users' ? <Users /> : null }
      </ProviderContext>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center'}}>
      <Typography sx={{ paddingTop: '30px' }} color="text.secondary">
        Admin dashboard 0.0.1 - <strong>Eztinerary</strong>
      </Typography>
      </Box>
    </Box>
  );
}