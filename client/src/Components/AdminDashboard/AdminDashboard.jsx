import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Dashboard from './Pages/Dashboard';
import About from './Pages/About';
import Actividades from './Pages/Actividades';
import Business from './Pages/Business';
import Estadisticas from './Pages/Estadisticas';
import Users from './Pages/Users';

import Box from '@mui/material/Box';
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
import StoreIcon from '@mui/icons-material/Store';
import BarChartIcon from '@mui/icons-material/BarChart';

export default function AdminDashboard() {
  const history = useNavigate();

  const [state, setState] = useState(false);

  const [page, setPage] = useState('dashboard');

  const handlePages = (p) => {
    switch (p) {
      case 'dashboard': {
        return <Dashboard />
      }
      case 'about': {
        return <About />
      }
      case 'actividades': {
        return <Actividades />
      }
      case 'business': {
        return <Business />
      }
      case 'estadisticas': {
        return <Estadisticas />
      }
      case 'users': {
        return <Users />
      }
      default: {
        return <Dashboard />
      }
    }
  };

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
        <ListItem button onClick={() => setPage('business')}>
          <ListItemIcon>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText primary='Business' />
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
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {handlePages(page)} 
      </Box>
    </Box>
  );
}