import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
// import useMediaQuery from '@mui/material/useMediaQuery';
import CardMedia from '@mui/material/CardMedia';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';

import { useTheme } from '@mui/material/styles';
import Swal from 'sweetalert2'

// import { useTheme } from '@mui/material/styles';

import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import sweetAlert from 'sweetalert';

import axios from 'axios';
import { useAxiosPrivate } from './Auth/useAxiosPrivate';

const style = {
  position: 'fixed',
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

  const axiosPrivate = useAxiosPrivate();

  console.log(activity.price_amount)
  const usDollar = Math.round(parseInt(activity.price_amount) * 1.10);
  // const isLogged = window.localStorage.getItem('token') ? true : false;
  const isLogged = useSelector(state => state.token) ? true : false;
  // const theme = useTheme();
  // const dispatch = useDispatch();
  // const token = JSON.parse(localStorage.getItem('token'));
  const userID = JSON.parse(localStorage.getItem('data')) ? JSON.parse(localStorage.getItem('data')).id : false;

  const [showIti, setShowIti] = useState(false);
  const [itis, setItis] = useState([]);
  const [itiID, setItiID] = useState('');
  const [itiName, setItiname] = useState('');

  const checkIfHasItineraries = async () => {
    try {
      const response = await axiosPrivate.get('/favorites');
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
        await axiosPrivate.post('/favorites', { activityID: activity._id, itineraryName: itiName ? itiName : itiID });
        Swal.fire({
          title: 'Congrats!',
          text:`Activity added succesfully in itinerary "${itiID}"!`,
          icon:'success',
          color: 'white',
          background:'#00498b',
          confirmButtonColor: '#24c59c'
          })
      }
      catch (err) {
        Swal.fire({
          title: 'Sorry!',
          text:'Error to add in itinerary, try add in another itinerary!',
          icon:'error',
          color: 'white',
          background:'#00498b',
          confirmButtonColor: '#24c59c'
          })
        console.log(err);
      }
    }
    else {
      close(e);
      setItis([]);
      await axiosPrivate.post('/favorites', { activityID: activity._id, itineraryName: itiName ? itiName : 'New itinerary' });
      Swal.fire({
        title: 'Congrats!',
        text:`Activity added succesfully in new Itinerary (${itiName ? itiName : 'New itinerary'})`,
        icon:'success',
        color: 'white',
        background:'#00498b',
        confirmButtonColor: '#24c59c'
        })
    }
  };

  async function watchedOrBookeedTimes(id) {
    try {
      await axios.post('http://localhost:3001/activities/watched', {type: 'booked', id: id})
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    checkIfHasItineraries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
          <DialogContent>
            <Typography variant="h5" color='black'>
              ${usDollar} US
            </Typography>
          </DialogContent>
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
                {
                  itiID === 'new'
                    ?
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <TextField
                        sx={{ ml: 1, width: '250%' }}
                        id="name"
                        name="name"
                        label='Create name for itinerary'
                        value={itiName}
                        onChange={(e) => setItiname(prev => prev = e.target.value)}
                      />
                    <button 
                    className='shopButton'
                    onClick={addItiFav}>Create new itinerary</button>
                    </Box>
                    :
                    null
                }
                {
                  itiID !== 'new'
                    ?
                    <button 
                    className='shopButton'
                    onClick={addItiFav}>Add to Itinerary</button>
                    :
                    null
                }
              </Box>
              :
              null
          }
        </DialogContent>
        <DialogActions>
          {isLogged ?
            <Box>
              <Box>
              <button 
              className='shopButton'
              onClick={() => setShowIti(true)}>Add to...</button>
              <button 
              className='shopButton'><a href={activity.booking} target='_blank'>Reserve</a></button>
              <button 
              className='shopButton'
              onClick={close} >Cancel</button>

              </Box>
            </Box>
            :
            <>
              <button 
              className='shopButton'
              onClick={close} ><a href='/Register'>More info</a></button>
              <button 
              className='shopButton'
              onClick={close} >Cancel</button>
            </>
          }
        </DialogActions>
      </DialogContent>
    </div>

  );
};