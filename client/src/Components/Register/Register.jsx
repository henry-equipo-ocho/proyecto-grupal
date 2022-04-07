import StarIcon from "@mui/icons-material/Star";
import { Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import logo from "../../Media/Logo.png";
import Footer from "../Footer";
import countries from "./countries";

const validationSchema = yup.object({
    name: yup
        .string("Enter your name")
        .min(2, "Name should be of minimum 8 characters length")
        .required("Name is required"),
    surname: yup
        .string("Enter your surname")
        .min(2, "Surname should be of minimum 8 characters length")
        .required("Surname is required"),
    country: yup
        .string("Select your country")
        .min(3, "Enter a valid country")
        .required("Country is required"),
    email: yup
        .string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string("Enter your password")
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
});

export default function Register() {
    const [open, setOpen] = useState(false);
    const [terms, setTerms] = useState(false);

    const history = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            country: "",
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            if (terms) {
                try {
                    await axios.post("http://localhost:3001/signup", values);
                    Swal.fire({
                        title: `Welcome to Eztinerary!`,
                        text: "Please, check your email and confirm your account",
                        icon: "success",
                        color: "white",
                        background: "#00498b",
                        confirmButtonColor: "#24c59c",
                    });
                    history("/home");
                } catch (e) {
                    Swal.fire({
                        title: `Error when joining`,
                        text: `A user with this email already exists`,
                        icon: "error",
                        color: "white",
                        background: "#00498b",
                        confirmButtonColor: "#24c59c",
                    });
                }
            } else {
                setOpen(true);
            }
        },
    });

    const handleClose = () => {
        setOpen(false);
    };

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
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "space-evenly",
                            marginTop: "70px",
                        }}
                    >
                        <Box>
                            <Typography
                                style={{ fontWeight: "300", fontSize: "60px" }}
                            >
                                Register at <br />
                                <span
                                    style={{
                                        fontWeight: "400",
                                        fontSize: "29px",
                                        position: "relative",
                                        top: "-45px",
                                        left: "0px",
                                    }}
                                >
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Eztinerary
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
                                You will enjoy benefits such as:
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
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    marginTop: "70px",
                                }}
                            >
                                <Alert
                                    severity="info"
                                    sx={{ marginLeft: "10px" }}
                                >
                                    All fields are required
                                </Alert>
                                <form onSubmit={formik.handleSubmit}>
                                    <Box>
                                        <TextField
                                            sx={{ my: 1, width: "100%" }}
                                            id="name"
                                            name="name"
                                            label="Name"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.name &&
                                                Boolean(formik.errors.name)
                                            }
                                            helperText={
                                                formik.touched.name &&
                                                formik.errors.name
                                            }
                                        />
                                        <TextField
                                            sx={{ my: 1, width: "100%" }}
                                            id="surname"
                                            name="surname"
                                            label="Surname"
                                            value={formik.values.surname}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.surname &&
                                                Boolean(formik.errors.surname)
                                            }
                                            helperText={
                                                formik.touched.surname &&
                                                formik.errors.surname
                                            }
                                        />
                                    </Box>
                                    <Box>
                                        <TextField
                                            sx={{ my: 1, width: "100%" }}
                                            id="email"
                                            name="email"
                                            label="Email"
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
                                    <Box>
                                        <TextField
                                            sx={{ my: 1, width: "100%" }}
                                            id="password"
                                            name="password"
                                            label="Password"
                                            type="password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
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
                                    <FormControl sx={{ my: 1, width: "100%" }}>
                                        <InputLabel id="country-select-label">
                                            Select country
                                        </InputLabel>
                                        <Select
                                            labelId="country-select-label"
                                            id="country"
                                            name="country"
                                            value={formik.values.country}
                                            defaultValue="Select country"
                                            label="Select country"
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.country &&
                                                Boolean(formik.errors.country)
                                            }
                                        >
                                            {countries.map((option) => {
                                                return (
                                                    <MenuItem
                                                        key={option.code}
                                                        value={option.label}
                                                    >
                                                        <img
                                                            width="20"
                                                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                            alt=""
                                                        />
                                                        {option.label}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                    <Box sx={{ textAlign: "center" }}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    color="primary"
                                                    id="terms"
                                                    onChange={(e) => {
                                                        setTerms(
                                                            e.target.checked
                                                        );
                                                    }}
                                                />
                                            }
                                            label="I accept the terms and conditions"
                                            color={!terms ? "error" : ""}
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
                    </Box>
                    <Dialog
                        open={open}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>{"Error"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                You must accept our terms and conditions.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Check</Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            </center>
            <Footer />
        </>
    );
}
