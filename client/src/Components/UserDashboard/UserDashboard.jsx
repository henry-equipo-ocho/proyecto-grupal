import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

const ResponsiveAppBar = () => {
  const history = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [currentPage, setCurrentPage] = useState('favorites');

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    switch(e.target.innerText.toLowerCase()){
      case 'favorites':{
        setCurrentPage('favorites')
        break;
      }
      case 'edit profile':{
        setCurrentPage('edit profile')
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
      <Box sx={{ display: 'flex', justifyContent: 'center'}}>
      <Typography sx={{ paddingTop: '30px' }} color="text.secondary">
        User dashboard 0.0.1 - <strong>Eztinerary</strong>
      </Typography>
      </Box>
    </Box>
    </>
  );
};
export default ResponsiveAppBar;
