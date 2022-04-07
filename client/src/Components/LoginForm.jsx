import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useFormik } from "formik";
// import { formLabelClasses, Link } from '@mui/material';
<<<<<<< HEAD
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setToken, setUserName } from './Redux/Actions/actions';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAxiosPrivate } from './Auth/useAxiosPrivate';

import GoogleButton from 'react-google-button'
// import GoogleLoginComponent from './GoogleLogin/GoogleLoginComponent';

// import swal from 'sweetalert';
import Swal from 'sweetalert2'
import axios from 'axios';

=======
import jwt_decode from "jwt-decode";
import * as React from "react";
// import GoogleButton from "react-google-button";
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import { useAxiosPrivate } from "./Auth/useAxiosPrivate";
import "./LoginForm.css";
import { setToken, setUserName } from "./Redux/Actions/actions";
>>>>>>> c9adcd2c9dd79c1812f0de40004b1030d63d4f8a

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 550,
    height: 600,
    p: 4,
};

const validationSchema = yup.object({
    email: yup
        .string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string("Enter your password")
        .min(8, "Password should be of minimum 8 characters length")
        .max(15, "Password should be of maximun 15 characters lenght")
        .required("Password is required"),
});

const FormDialog = ({ abierto, close }) => {
    const axiosPrivate = useAxiosPrivate();
    const [open, setOpen] = React.useState(abierto);
    const history = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const datos = await axios.post(
                    "http://localhost:3001/signin",
                    values
                );
                var decoded = jwt_decode(datos.data.data);
                const miStorage = window.localStorage;
                dispatch(setToken(datos.data.data));
                miStorage.setItem("data", JSON.stringify(decoded));
                miStorage.setItem("loggedIn", "true");
                //miStorage.setItem('token',  JSON.stringify(datos.data.data));
                dispatch(setUserName(decoded.email));
                const nombre = JSON.parse(localStorage.getItem("data")).name;
                formik.resetForm();

                Swal.fire({
                    title: `${nombre}`,
                    text: "Welcome to Eztinerary",
                    icon: "success",
                    color: "white",
                    background: "#00498b",
                    confirmButtonColor: "#24c59c",
                });
                history("/dashboard");
            } catch (error) {
                Swal.fire({
                    customClass: {
                        container: "swal-container",
                    },
                    title: `Oops...`,
                    text:
                        error.response.data.errors.message ===
                            "Email not verified"
                            ? "Please, verify your email before signing in to your account"
                            : "Please, check your password and try again",
                    icon: "error",
                    color: "white",
                    background: "#00498b",
                    confirmButtonColor: "#24c59c",
                });
            }
        },
    });

    const googleLogin = async () => {
        const googleLoginURL = "http://localhost:3001/signin/google";
        window.open(googleLoginURL, '_self');
    };

<<<<<<< HEAD
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
  
  
  const responseSucess = async () => {
    const googleLoginURL = "http://localhost:3001/signin/google";
   

    const datos = window.open(
      googleLoginURL,
      history('/dashboard'), 
      "width=500,height=600",
      );
        
    
  };

  // const handleClick = async() => {
  //   try {
  //     const datos = await axios.get("http://localhost:3001/signin/google");
  //     var decoded = jwt_decode(datos.data.data);
  //     const miStorage = window.localStorage
  //     dispatch(setToken(datos.data.data))
  //     miStorage.setItem('data', JSON.stringify(decoded))
  //     miStorage.setItem('loggedIn', 'true')
  //     //miStorage.setItem('token',  JSON.stringify(datos.data.data));
  //     dispatch(setUserName(decoded.email))
  //     const nombre = JSON.parse(localStorage.getItem('data')).name
  //     formik.resetForm()
  //     Swal.fire({
  //       title:`${nombre}`,
  //       text:'Bienvenido a Eztinerary',
  //       icon:'success',
  //       color: 'white',
  //       background:'#00498b',
  //       confirmButtonColor: '#24c59c'
  //     });
  //     history('/dashboard');
  //   } catch (error) {
  //     console.log(error)
  //   }
    
  // }

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
              {/* <Button onClick={handleClick}>
                Login with Google
              </Button> */}
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
=======
    const facebookLogin = async () => {
        const facebookLoginURL = "http://localhost:3001/signin/facebook";
        window.open(facebookLoginURL, '_self');
    };

    const redirectToResetPassword = () => {
        history("/forgot-password");
    }

    return (
        <>
            <Dialog
                sx={style}
                open={open}
                BackdropProps={{
                    style: {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                    },
                }}
            >
                <form
                    style={{ borderRadius: "5px", boxShadow: "24" }}
                    onSubmit={formik.handleSubmit}
                >
                    <DialogTitle>Log in</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            variant="standard"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.email &&
                                Boolean(formik.errors.email)
                            }
                            helperText={
                                formik.touched.email && formik.errors.email
                            }
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
                            error={
                                formik.touched.password &&
                                Boolean(formik.errors.password)
                            }
                            helperText={
                                formik.touched.password &&
                                formik.errors.password
                            }
                        />

                        <center>
                            <Button onClick={redirectToResetPassword}>Did you forget your password?</Button>
                            <br />
                            <button className="shopButton" onClick={close}>
                                Cancel
                            </button>
                            <button
                                className="shopButton"
                            >
                                Submit
                            </button>
                        </center>
                        <DialogContent>
                            <GoogleLoginButton onClick={googleLogin} />
                        </DialogContent>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
>>>>>>> c9adcd2c9dd79c1812f0de40004b1030d63d4f8a
};

export default FormDialog;
