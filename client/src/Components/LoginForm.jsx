import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
// import { formLabelClasses, Link } from '@mui/material';
import jwt_decode from "jwt-decode";
import * as React from "react";
import GoogleButton from "react-google-button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import { useAxiosPrivate } from "./Auth/useAxiosPrivate";
import { setToken, setUserName } from "./Redux/Actions/actions";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: 500,
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
                const datos = await axiosPrivate.post("/signin", values);
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
                    title: `Oops...`,
                    text: "Incorrect user or password",
                    icon: "error",
                    color: "white",
                    background: "#00498b",
                    confirmButtonColor: "#24c59c",
                });
            }
        },
    });

    const responseSucess = async () => {
        const googleLoginURL = "http://localhost:3001/signin/google";
    };

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
                    style={{ border: "solid 1px black" }}
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

                        <DialogContent>
                            <Button>Did you forget your password?</Button>{" "}
                            <GoogleButton onClick={responseSucess} />
                        </DialogContent>
                        <DialogActions>
                            <button className="shopButton" onClick={close}>
                                Cancel
                            </button>
                            <button
                                className="shopButton"
                                onClick={() => setOpen(!open)}
                            >
                                Submit
                            </button>
                        </DialogActions>
                    </DialogContent>
                    {/* <GoogleLoginComponent /> */}
                </form>
            </Dialog>
        </>
    );
};

export default FormDialog;
