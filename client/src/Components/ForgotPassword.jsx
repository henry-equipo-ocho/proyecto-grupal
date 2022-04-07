import React from "react";
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

const validationSchema = yup.object({
    email: yup
        .string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
});

export default function ForgotPassword() {

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                await axios.post("/signin/forgot-password", values);
                Swal.fire({
                    title: "Email sent",
                    text: "Check your email to reset your password",
                    icon: "success",
                    color: "white",
                    background: "#00498b",
                    confirmButtonColor: "#24c59c",
                });
            } catch(e) {
                Swal.fire({
                    title: "Oops...",
                    text: "Email not found in our database",
                    icon: "error",
                    color: "white",
                    background: "#00498b",
                    confirmButtonColor: "#24c59c",
                });
                console.log(e);
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
                                RECOVER YOUR PASSWORD: <br />
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
                                        id="email"
                                        name="email"
                                        label="Enter your email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.email &&
                                            Boolean(formik.errors.email)
                                        }
                                        helperText={
                                            formik.touched.email &&
                                            formik.errors.email
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