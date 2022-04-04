import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import useStyles from './Styles'

const Header = ({ setCoords }) => {
  const [autocomplete, SetAutocomplete] = useState(null)
  
  const classes = useStyles();
  const onLoad = (autoc) => SetAutocomplete(autoc);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng })
  }

  return (
   <AppBar position='static'>
     <Toolbar className={classes.toolbar}>
     <Typography variant='h5' className={classes.title}>
        Eztenirary corp.
     </Typography>
     <Box display="flex">
       <Typography variant='h6' className={classes.title}>
         Explore New Places
       </Typography>
       <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
         <div className={classes.search}>
           <div className={classes.searchIcon}>
            <SearchIcon />
           </div>
           <InputBase placeholder='Search...' classes={{ root: classes.inputRoot, input: classes.inputInput}} />
         </div>
       </Autocomplete>
     </Box>

     </Toolbar>

   </AppBar>
  );
}
export default Header;
