import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import HomeIcon from '@mui/icons-material/Home';
import Logo from '../Media/Logo.png'

export default function NavBar({handleLoginForm}) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button
                    color="inherit"
                    variant='none'
                    href='/home'
                    size='large'>
                        <img src={Logo} alt='img notfound' width="50" height="50" />
                    </Button>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Eztinerary
                    </Typography>
                    <Button
                    color="inherit"
                    variant='outlined'
                    onClick={handleLoginForm}
                    startIcon={<PersonIcon />} >Login</Button>
                    <Button
                    color="inherit"
                    variant='outlined'
                    startIcon={<AppRegistrationIcon />}
                    href='/register'>Singup</Button>   
                </Toolbar>
            </AppBar>
        </Box>
    );
};