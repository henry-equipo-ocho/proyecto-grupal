import React from 'react';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import PhoneIcon from '@mui/icons-material/Phone';
// import  Rating  from '@material-ui/lab/Rating';

import useStyles from './Styles';


const PlaceDetails = ({ place }) => {
  
  const classes = useStyles()
  return (
    <h1>{place.name}</h1>
  
  )
}
export default PlaceDetails;
