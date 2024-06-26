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
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setToken, setUserName } from './Redux/Actions/actions';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAxiosPrivate } from './Auth/useAxiosPrivate';

import GoogleButton from 'react-google-button'
import GoogleLoginComponent from './GoogleLogin/GoogleLoginComponent';

import swal from 'sweetalert';
import Swal from 'sweetalert2'


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

  const axiosPrivate = useAxiosPrivate();

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
        // console.log(values)
        const datos = await axiosPrivate.post('/signin', values)
        var decoded = jwt_decode(datos.data.data);
        const miStorage = window.localStorage
        dispatch(setToken(datos.data.data))
        miStorage.setItem('data', JSON.stringify(decoded))
        miStorage.setItem('loggedIn', 'true')
        //miStorage.setItem('token',  JSON.stringify(datos.data.data));
        dispatch(setUserName(decoded.email))
        const nombre = JSON.parse(localStorage.getItem('data')).name
        formik.resetForm()

        Swal.fire({
          title:`${nombre}`,
          text:'Bienvenido a Eztinerary',
          icon:'success',
          color: 'white',
          background:'#00498b',
          confirmButtonColor: '#24c59c'
        });
        history('/dashboard');
      } catch (error) {
        Swal.fire({
          title:`Oops...`,
          text:'User or password incorrect',
          icon:'error',
          color: 'white',
          background:'#00498b',
          confirmButtonColor: '#24c59c'
        });
      }
    },
  });
  
  // const fetchAuthAuthenticated = async () => {
  //   const response = await axiosPrivate.get("http://localhost:3001/signin/verify-email", { withCredentials: true}).catch((err) => {
  //     console.log('Not properly authenticated')
  //   }) 

  //   if (response && response.data) {
  //     console.log('User:', response.data)
  //   }
  // }

  const responseSucess = async () => {
    const googleLoginURL = "http://localhost:3001/signin/google";
   

    const datos = window.open(
      googleLoginURL, 
      "width=500,height=600",
     
      );
        
    // let timer;
    // const googleLoginURL = "http://localhost:3001/signin/google";

    // const newWindow = window.open(
    //   googleLoginURL, 
    //   "_self",
    //   "width=500,height=600");
   
      

    // if (newWindow) {
    //   timer = setInterval(() => {
    //     if (newWindow.closed) {
    //       console.log('you are authenticated');
    //       // fetchAuthAuthenticated()
    //       if (timer) clearInterval(timer)
          
    //     }
    //   }, 5000)
    // }
  };

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
               <GoogleButton onClick={responseSucess}/>
            </DialogContentText>
    <DialogContent>
              <DialogActions>
                <button
                  className='shopButton'
                  onClick={close} >Cancel</button>
                <button
                  className='shopButton'
                  onClick={() => setOpen(!open)} >Submit</button>
              </DialogActions>
            </DialogContent>

          </DialogContent>
               {/* <GoogleLoginComponent /> */}
        </form>
      </Dialog>
    </>
  );
};

export default FormDialog




