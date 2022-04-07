import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useFormik } from "formik";
// import { formLabelClasses, Link } from '@mui/material';
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
};

export default FormDialog;
