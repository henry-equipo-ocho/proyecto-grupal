import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import CardMedia from '@mui/material/CardMedia';
import { useTheme } from '@mui/material/styles';
import Latam from '../Media/latam.jpg'
import { Typography } from '@mui/material';

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

export default function ActivityDetail({ activity, close }) {
    const usDollar = Math.round(parseInt(activity.price_amount) * 1.10) ;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    console.log(activity)
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
                </DialogContent>
                <DialogActions>
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
                </DialogActions>
            </DialogContent>
        </div>

    );
};