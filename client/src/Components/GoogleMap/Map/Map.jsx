import React from 'react';
import GoogleMapReact from 'google-map-react';
import  Paper, { Rating }  from "@mui/material";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import LocationOnOutLined from "@mui/icons-material/LocationOnOutlined";

import useStyles from './Styles';



const Map = ({ setCoords, setBounds, coords }) => {


  const  classes = useStyles();
  const isMobile = useMediaQuery('(min-width:600px)');

  
  return (
    <div className={classes.mapContainer}>

      <GoogleMapReact 
        bootstrapURLKeys={{ key: "AIzaSyD2nAbboq2IC6FykSWdGRmhi_7qCoKEq0c" }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]} 
        options={''}
        onChange={(e)=> {
          console.log(e)
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw})
          
        }}
        onChildClick={''}
         >

      </GoogleMapReact>
      
    </div>
  )
}
export default Map;
