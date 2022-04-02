import React, { useState, useEffect } from 'react';

import axios from 'axios';

import './loader.css';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function Estadisticas() {

  const [totalUsers, setTotalUsers] = useState(0);
  const [usersVer, setUsersVer] = useState(0);
  const [usersNotVer, setUsersNotVer] = useState(0);

  const [totalActivities, setTotalActivities] = useState(0);
  const [activitiesBusiness, setActivitiesBusiness] = useState(0);
  const [activitiesAmadeus, setActivitiesAmadeus] = useState(0);

  const [totalBusiness, setTotalBusiness] = useState(0);
  const [businessBasic, setBusinessBasic] = useState(0);
  const [businessPro, setBusinessPro] = useState(0);
  const [businessPremium, setBusinessPremium] = useState(0);

  const [loadUsers, setLoadUsers] = useState(true);
  const [loadActivities, setLoadActivities] = useState(true);
  const [loadBusiness, setLoadBusiness] = useState(true);

  const dataUsers = {
    labels: ['Users verified', 'Users not verified'],
    datasets: [
      {
        label: '# of users',
        data: [usersVer, usersNotVer],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const dataActivities = {
    labels: ['Activities by business', 'Activities by Amadeus'],
    datasets: [
      {
        label: '# of activities',
        data: [activitiesBusiness, activitiesAmadeus],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const dataBusiness = {
    labels: ['Business basic', 'Business professional', 'Business Premium'],
    datasets: [
      {
        label: '# of business',
        data: [businessBasic, businessPro, businessPremium],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 233, 210, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 171, 87, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const cargarUsers = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const datos = await axios.get('http://localhost:3001/admin/users', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      setTotalUsers(datos.data.data.length);
      setUsersVer(datos.data.data.filter(user => user.isVerified).length);
      setUsersNotVer(datos.data.data.filter(user => !user.isVerified).length);
      setLoadUsers(false);
    }
    catch (e) {
      console.log(e);
    }
  };
  
  const cargarActivities = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const datos = await axios.get('http://localhost:3001/admin/activities', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      setTotalActivities(datos.data.data.length);
      setActivitiesBusiness(datos.data.data.filter(act => !act.booking.includes('https://b2c.mla.cloud/')).length);
      setActivitiesAmadeus(datos.data.data.filter(act => act.booking.includes('https://b2c.mla.cloud/')).length);
      setLoadActivities(false);
    }
    catch (e) {
      console.log(e);
    }
  };

  const cargarBusiness = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const datos = await axios.get('http://localhost:3001/admin/users', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      setTotalBusiness(datos.data.data.filter(busi => busi.activeSubscription).length);
      setBusinessBasic(datos.data.data.filter(busi => busi.activeSubscription && busi.payments[busi.payments.length-1].tier === 1).length);
      setBusinessPro(datos.data.data.filter(busi => busi.activeSubscription && busi.payments[busi.payments.length-1].tier === 2).length);
      setBusinessPremium(datos.data.data.filter(busi => busi.activeSubscription && busi.payments[busi.payments.length-1].tier === 3).length);
      setLoadBusiness(false);
    }
    catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    cargarUsers();
    cargarActivities();
    cargarBusiness();
  }, []);

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', paddingTop: '30px' }}>
      <Typography variant='h4' sx={{ mb: 1 }}>Statistics Dashboard</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Box sx={{ width: '25vw' }}>
          <Typography variant='h6' sx={{ mb: 1 }}>Users</Typography>
          {
            !loadUsers ?
            <Box>
              <Pie data={dataUsers} />
              <Typography variant='h6' sx={{ mb: 1 }}>Total users: {totalUsers}</Typography>
            </Box>
              :
              <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          }
        </Box>
        <Box sx={{ width: '25vw' }}>
          <Typography variant='h6' sx={{ mb: 1 }}>Activities</Typography>
          {
            !loadActivities ?
            <Box>
              <Pie data={dataActivities} />
              <Typography variant='h6' sx={{ mb: 1 }}>Total activities: {totalActivities}</Typography>
            </Box>
              :
              <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          }
        </Box>
        <Box sx={{ width: '25vw' }}>
          <Typography variant='h6' sx={{ mb: 1 }}>Business</Typography>
          {
            !loadBusiness ?
            <Box>
              <Pie data={dataBusiness} />
              <Typography variant='h6' sx={{ mb: 1 }}>Total business: {totalBusiness}</Typography>
            </Box>
              :
              <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          }
        </Box>
      </Box>
    </Container>
  )
}
