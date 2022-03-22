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
    width: 600,
    height: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ActivityDetail({ close }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <div>

            <DialogContent sx={style}>
                <DialogTitle id="responsive-dialog-title">
                    {"Viaje por latinoamerica"}
                </DialogTitle>
                <CardMedia
                    component="img"
                    height="140"
                    alt="Turismo"
                    image={Latam}
                />
                <DialogContent>
                    <DialogContentText>
                        Una variedad de actividades para realizar desde caminata ecologicas
                        hasta paracadismo
                    </DialogContentText>
                    <DialogContentText>
                        <Typography variant="h5" color='black'>
                        US $ 1.000
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
                    >Comprar</Button>
                </DialogActions>
            </DialogContent>
        </div>

    );
};