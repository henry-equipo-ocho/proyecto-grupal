import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import { formLabelClasses, Link } from '@mui/material';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setUserName } from './Redux/Actions/actions';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 400,
  p: 4,
};

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .max(15, 'Password should be of maximun 15 characters lenght')
    .required('Password is required'),
});

const FormDialog = ({ abierto, close }) => {
  const [open, setOpen] = React.useState(abierto);
  const history = useNavigate();
  const dispatch = useDispatch();
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        //console.log(values)
        const datos = await axios.post('http://localhost:3001/signin', values)
        var decoded = jwt_decode(datos.data.data);
        const miStorage = window.localStorage
        miStorage.setItem('token', JSON.stringify(datos.data.data))
        miStorage.setItem('data', JSON.stringify(decoded))
        dispatch(setUserName(decoded.email))
        formik.resetForm()
        alert('Sesión iniciada con éxito');
        history('/dashboard');
      } catch (error) {
        console.log(error)
      }
    },
  });

  return (
    <>
      <Dialog
        sx={style}
        open={open}
        BackdropProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
      >
        <form style={{ border: 'solid 1px black' }} onSubmit={formik.handleSubmit}>
          <DialogTitle>Iniciar Sesión</DialogTitle>
          <DialogContent >
            <TextField
              autoFocus
              fullWidth
              id="email"
              name="email"
              label="Email"
              variant="standard"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              autoFocus
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              variant="standard"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <DialogContentText>
              <Button>
                Olvidaste tu Contraseña?
              </Button>
              <DialogActions>
                <Button
                  onClick={close}
                  variant="outlined"
                >Cancel
                </Button>
                <Button onClick={() => setOpen(!open)} color="primary" variant="contained" fullWidth type="submit">
                  Submit
                </Button>
              </DialogActions>
            </DialogContentText>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

export default FormDialog




