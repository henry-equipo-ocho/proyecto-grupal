import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import StarIcon from "@mui/icons-material/Star";

import logo from "../Media/Logo.png";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import axios from "axios";
import Footer from "./Footer";

const validationSchema = yup.object().shape({
    password: yup
        .string("Enter your new password")
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
    confirmPassword: yup
        .string("Confirm your new password")
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Password is required"),
});

export default function Reset() {

    const history = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const headers = {Authorization: `Bearer ${token}`};
                await axios.post("http://localhost:3001/update/password", values, {headers: headers});
                Swal.fire({
                    title: "Password Reset Successfully",
                    text: "You can now login with your new password",
                    icon: "success",
                    color: "white",
                    background: "#00498b",
                    confirmButtonColor: "#24c59c",
                });
                history("/login");
            } catch(e) {
                Swal.fire({
                    title: "Oops...",
                    text: "An error has occurred, please request a new password reset link",
                    icon: "error",
                    color: "white",
                    background: "#00498b",
                    confirmButtonColor: "#24c59c",
                });
            }
        }
    });

    return (
        <>
            <header className="header">
                <div>
                    <img src={logo} alt="Not found" />
                </div>
                <div>
                    <button>
                        <a href="/home">HOME</a>
                    </button>
                </div>
            </header>
            <center>
                <Container 
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        padding: "30px",
                        background: "white",
                        margin: "10px",
                        borderRadius: "5px",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            flexDirection: "column",
                            justifyContent: "center",
                            marginTop: "20px",
                        }}
                    >
                        
                        <Box>
                            <Typography
                                style={{ fontWeight: "300", fontSize: "60px" }}
                            >
                                Remember at <br />
                                <span
                                    style={{
                                        fontWeight: "400",
                                        fontSize: "29px",
                                        position: "relative",
                                        top: "-45px",
                                        left: "0px",
                                    }}
                                >
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Eztinerary
                                </span>
                            </Typography>
                            <Box
                                style={{
                                    position: "relative",
                                    top: "-50px",
                                    left: "0px",
                                    fontSize: "18px",
                                }}
                            >
                                You enjoy benefits such as:
                                <List
                                    sx={{
                                        width: "100%",
                                        maxWidth: 360,
                                        bgcolor: "background.paper",
                                    }}
                                    aria-label="beneficios"
                                >
                                    <ListItem disablePadding>
                                        <ListItemIcon>
                                            <StarIcon color="success" />
                                        </ListItemIcon>
                                        <ListItemText primary="Have a list of favorite itineraries" />
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemIcon>
                                            <StarIcon color="success" />
                                        </ListItemIcon>
                                        <ListItemText primary="Personalized search based on your preferences" />
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemIcon>
                                            <StarIcon color="success" />
                                        </ListItemIcon>
                                        <ListItemText primary="and many more!" />
                                    </ListItem>
                                </List>
                            </Box>
                        </Box>
                        <Box>
                        <Typography
                                style={{ fontWeight: "500", fontSize: "24px" }}
                            >
                                RESET YOUR PASSWORD: <br />
                                <span
                                    style={{
                                        fontWeight: "400",
                                        fontSize: "29px",
                                        position: "relative",
                                        top: "-45px",
                                        left: "0px",
                                    }}
                                >
                                </span>
                            </Typography>
                            <form onSubmit={formik.handleSubmit}>
                                <Box>
                                    <TextField 
                                        sx={{ my: 1, width: "100%" }}
                                        id="password"
                                        name="password"
                                        label="Enter your new password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        type="password"
                                        error={
                                            formik.touched.password &&
                                            Boolean(formik.errors.password)
                                        }
                                        helperText={
                                            formik.touched.password &&
                                            formik.errors.password
                                        }
                                    />
                                </Box>
                                <Box>
                                    <TextField 
                                        sx={{ my: 1, width: "100%" }}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        label="Confirm your new password"
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        type="password"
                                        error={
                                            formik.touched.confirmPassword &&
                                            Boolean(formik.errors.confirmPassword)
                                        }
                                        helperText={
                                            formik.touched.confirmPassword &&
                                            formik.errors.confirmPassword
                                        }
                                    />
                                </Box>
                                <Button
                                    sx={{ my: 1, width: "100%" }}
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </form>
                        </Box>
                    </Box>
                </Container>
            </center>
            <Footer />
        </>
    );
}