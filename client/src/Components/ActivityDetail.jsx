import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import CardMedia from '@mui/material/CardMedia';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';

import { imageListItemClasses, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import sweetAlert from 'sweetalert';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height: 650,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ActivityDetail({ activity, close, id }) {
  const usDollar = Math.round(parseInt(activity.price_amount) * 1.10);
  const isLogged = window.localStorage.getItem('token') ? true : false;
  const theme = useTheme();
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem('token'));
  const userID = JSON.parse(localStorage.getItem('data')) ? JSON.parse(localStorage.getItem('data')).id : false;

  const [showIti, setShowIti] = useState(false);
  const [itis, setItis] = useState([]);
  const [itiID, setItiID] = useState('');

  const checkIfHasItineraries = async () => {
    try {
      const response = await axios.get('http://localhost:3001/favorites',
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      setItis(response.data.data.map(el => el.name));
    } catch (e) {
      console.log(e);
    }
  };

  const addItiFav = async (e) => {
    if (itiID !== 'new') {
      close(e);
      setItis([]);
      try {
        await axios.post('http://localhost:3001/favorites', { activityID: activity._id, itineraryIndex: 0, itineraryName: itiID }, { headers: { 'Authorization': `Bearer ${token}` } })
        sweetAlert('Congrats', `Activity added succesfully in itinerary "${itiID}"!`, 'success');
      }
      catch (e) {
        sweetAlert('Error', 'Error to add in itinerary, try add in another itinerary!', 'error');
        console.log(e);
      }
    }
    else {
      close(e);
      setItis([]);
      await axios.post('http://localhost:3001/favorites', { activityID: activity._id, itineraryIndex: 0 }, { headers: { 'Authorization': `Bearer ${token}` } })
      sweetAlert('Congrats', 'Activity added succesfully in new Itinerary!', 'success')
    }
  };

  useEffect(() => {
    checkIfHasItineraries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isFav = async (e) => {
    if (!itis.length) {
      close(e);
      setItis([]);
      try {
        await axios.post('http://localhost:3001/favorites', { activityID: activity._id, itineraryIndex: 0 }, { headers: { 'Authorization': `Bearer ${token}` } })
        sweetAlert('Congrats', 'Activity added succesfully!', 'success')
      } catch (error) {
        console.log(error)
      }
    } else {
      setShowIti(true);
    }
  };

  return (
    <div>

      <DialogContent sx={style}>
        <DialogTitle id="responsive-dialog-title">
          {activity.name}
        </DialogTitle>
        <CardMedia
          component="img"
          height="300"
          alt="Turismo"
          image={activity.picture}
        />
        <DialogContent>
          <DialogContentText>
            {activity.description}
          </DialogContentText>
          <DialogContentText>
            <Typography variant="h5" color='black'>
              ${usDollar}
            </Typography>
          </DialogContentText>
          {
            showIti ?
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', border: '1px solid black', padding: '10px' }}>
                <Typography variant="h6" color='black'>
                  Select itinerary to add Activity
                </Typography>
                <FormControl sx={{ my: 1, width: '100%' }}>
                  <InputLabel id="itinerary-select-label">Select Itinerary</InputLabel>
                  <Select labelId="itinerary-select-label"
                    id="itinerary"
                    name="itinerary"
                    value={itiID}
                    defaultValue="Select Itinerary"
                    label="Select Itinerary"
                    onChange={(e) => setItiID(e.target.value)}
                  >
                    <MenuItem value='new'>Create new itinerary</MenuItem>
                    {
                      itis?.map(option => {
                        return (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        )
                      })
                    }
                  </Select>
                </FormControl>
                <Button
                  autoFocus
                  color="inherit"
                  variant='outlined'
                  onClick={addItiFav}
                >Add to Itinerary</Button>
              </Box>
              :
              null
          }
        </DialogContent>
        <DialogActions>
          {isLogged ?
            <Box>
              <Box>
                <Button
                  color="inherit"
                  variant='outlined'
                  onClick={(e) => isFav(e)}
                >Favorite</Button>
                <Button
                  autoFocus
                  color="inherit"
                  variant='outlined'
                  onClick={close}>Cancel</Button>
                <Button
                  autoFocus
                  color="inherit"
                  variant='outlined'
                  href={activity.booking}
                  target='_blank'
                >Reservar</Button>
              </Box>
            </Box>
            :
            <>
              <Button
                autoFocus
                color="inherit"
                variant='outlined'
                onClick={close}>Cancel</Button>
              <Button
                autoFocus
                color="inherit"
                variant='outlined'
                href={activity.booking}
                target='_blank'
              >Reservar</Button>
            </>
          }
        </DialogActions>
      </DialogContent>
    </div>

  );
};