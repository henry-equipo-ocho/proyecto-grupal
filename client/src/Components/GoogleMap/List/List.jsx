import React, { useState } from 'react'

import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './Styles'
import { CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';

const List = ({ places }) => {
  const  [type, SetType] = useState('restaurants');
  const  [rating, SetRating] = useState('');

  const classes = useStyles();
 
  
  return (
    <div className={classes.container}>
      <Typography variant='h4'>Restaurants, Hotels & Attractions around you</Typography>
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={(e) =>SetType(e.target.value)}>
        <MenuItem value='restaurants'>Restaurants</MenuItem> 
        <MenuItem value='hotels'>Hotels</MenuItem> 
        <MenuItem value='attractions'>Attractions</MenuItem>

        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Rating</InputLabel>
        <Select value={rating} onChange={(e) =>SetRating(e.target.value)}>
        <MenuItem value={0}>All</MenuItem> 
        <MenuItem value={3}>Above 3.0</MenuItem> 
        <MenuItem value={4}>Above 4.0</MenuItem>
        <MenuItem value={4.5}>Above 4.5</MenuItem>

        </Select>
      </FormControl>
      <Grid container spacing={3} className={classes.list}>
        {places?.map((place, i) => (
          <Grid item key={i} xs={12}>
            <PlaceDetails place={place} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
export default List;
