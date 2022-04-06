import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { SET_TOKEN } from '../Redux/Actions/actions_types';
import { setUserName } from '../Redux/Actions/actions';

import { useAxiosPrivate } from '../Auth/useAxiosPrivate';

import Footer from '../Footer';
import Favorites from './Favorites';
import EditProfile from './EditProfile';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';


const pages = ['Favorites', 'Edit profile', 'Plans'];

const UserDashboard = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const isLogged = useSelector(state => state.token) || localStorage.getItem('loggedIn') ? true : false;
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [currentPage, setCurrentPage] = useState('favorites');

  useEffect(() => {
    if(!isLogged){
      history('/home');
    }
    document.title = 'Eztinerary - User Dashboard';
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const logout = (e) => {
    window.localStorage.clear();
    dispatch(setUserName('Viajero'));
    axiosPrivate.get('/token/clear');
    dispatch({ type: SET_TOKEN, payload: '' });
    history('/home');
  }

  const handleCloseNavMenu = (e) => {
    switch(e.target.innerText.toLowerCase()){
      case 'logout':{
        logout(e);
        break;
      }
      case 'favorites':{
        setCurrentPage('favorites');
        break;
      }
      case 'edit profile':{
        setCurrentPage('edit profile');
        break;
      }
      default: {
        break;
      }
    }
    setAnchorElNav(null);
  };

  return (
    <>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            User Dashboard
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="dashboard menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem>
                <Link to='/home' style={{ textDecoration: 'none', color: 'black' }}>
                  <Typography>
                    Home
                  </Typography>
                </Link>
              </MenuItem>
              {pages.map((page) => (
                <MenuItem key={page} onClick={(e) => page !== 'Plans' ? handleCloseNavMenu(e) : history('/plans')}>
                  {page}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            UserDashboard
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link to='/home' style={{ textDecoration: 'none' }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Home
              </Button>
            </Link>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={(e) => page !== 'Plans' ? handleCloseNavMenu(e) : history('/plans')}
                sx={{ my: 2, color: 'white !important', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Box>
      { currentPage === 'favorites' 
        ?
          <Favorites />
        :
          <EditProfile />
      }
      <Footer />

    </Box>
    </>
  );
};

export default UserDashboard;
