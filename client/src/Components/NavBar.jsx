import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Logo from '../Media/Logo.png';
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setUserName } from './Redux/Actions/actions';
import SearchBar from './SearchBar/SearchBar.jsx';
import SearchBarCopy from './SearchBar/SearchBarCopy';
import { SET_TOKEN } from './Redux/Actions/actions_types';

import { useAxiosPrivate } from './Auth/useAxiosPrivate';

export default function NavBar({ handleLoginForm }) {

    const axiosPrivate = useAxiosPrivate();

    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.token) || localStorage.getItem('loggedIn') ? true : false;

    const logout = (e) => {
        e.preventDefault();
        window.localStorage.clear();
        dispatch(setUserName('Viajero'));
        axiosPrivate.get('/token/clear');
        dispatch({ type: SET_TOKEN, payload: '' });
        window.location.reload();
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button
                        color="inherit"
                        variant='none'
                        href='/home'
                        size='large'>
                        <img src={Logo} alt='img notfound' width="65" height="50" />
                    </Button>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Eztinerary
                    </Typography>
                    


                    {isLogged ?
                        <>
                            <Link to='/dashboard' style={{ textDecoration: 'none', color: 'white', marginRight: '10px' }}>
                                <Button
                                    color="inherit"
                                    variant='outlined'
                                    startIcon={<PersonIcon />} >Dashboard</Button>
                            </Link>
                            <Button
                                color="inherit"
                                variant='outlined'
                                href="javascript:location.reload()"
                                onClick={(e) => logout(e)}
                                startIcon={<PersonIcon />} >Logout</Button>
                        </>
                        :
                        <>
                            <Button
                                color="inherit"
                                href='/plans'
                            >Plans</Button>
                            <Button
                                color="inherit"
                                onClick={handleLoginForm}
                                startIcon={<PersonIcon />}>Login</Button>
                            <Button
                                color="inherit"
                                variant='outlined'
                                startIcon={<AppRegistrationIcon />}
                                href='/register'>Signup</Button>
                        </>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    )};