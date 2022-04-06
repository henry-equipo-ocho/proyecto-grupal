import React, { useState, useEffect } from 'react';

import './back.css';

import { ProviderContext } from './Context/context';

import { useNavigate } from 'react-router-dom';

import Dashboard from './Pages/Dashboard';
import About from './Pages/About';
import Actividades from './Pages/Actividades';
import Estadisticas from './Pages/Estadisticas';
import Users from './Pages/Users';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
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

  const [loading, setLoading] = useState(true);

  const verify = async () => {
    try {
      const data = JSON.parse(localStorage.getItem('data')).role;
      if (data !== 3) {
        history('/home');
      }
      setLoading(false);
    }
    catch (e) {
      history('/home');
    }
  };

  useEffect(() => {
    setLoading(true);
    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <Container maxWidth={false}>
      {
        !loading ?
          <>
            <Box>
              <Button onClick={toggleDrawer(true)} sx={{ position: 'fixed', left: '0', margin: '5px' }} color='inherit' variant='contained'><MenuIcon /></Button>
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
                {page === 'dashboard' ? <Dashboard /> : null}
                {page === 'about' ? <About /> : null}
                {page === 'actividades' ? <Actividades /> : null}
                {page === 'estadisticas' ? <Estadisticas /> : null}
                {page === 'users' ? <Users /> : null}
              </ProviderContext>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography className='footer'>
                <span style={{ color: 'black' }}>Admin dashboard 0.0.1 - <strong>Eztinerary</strong></span>
              </Typography>
            </Box>
          </>
          :
          null
      }
    </Container>
  );
}