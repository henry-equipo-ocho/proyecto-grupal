import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import React from "react";
import Swal from "sweetalert2";
import * as yup from "yup";
import { useAxiosPrivate } from "../../../Auth/useAxiosPrivate";
import countries from "../../../Register/countries";

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

export default function Add() {
    const axios = useAxiosPrivate();

    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            country: "",
            email: "",
            password: "",
            role: 0,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                await axios.post("/admin/create/user", values);
                Swal.fire({
                    title: `Success`,
                    text: "Successfully added user!",
                    icon: "success",
                    color: "white",
                    background: "#00498b",
                    confirmButtonColor: "#24c59c",
                });
                formik.resetForm();
            } catch (e) {
                Swal.fire({
                    title: `Error`,
                    text: `${e}`,
                    icon: "error",
                    color: "white",
                    background: "#00498b",
                    confirmButtonColor: "#24c59c",
                });
            }
        },
    });

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Typography variant="h4">Add a user</Typography>
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
                            formik.touched.name && Boolean(formik.errors.name)
                        }
                        helperText={formik.touched.name && formik.errors.name}
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
                            formik.touched.surname && formik.errors.surname
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
                            formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
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
                            formik.touched.password && formik.errors.password
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
                <FormControl sx={{ my: 1, width: "100%" }}>
                    <InputLabel id="role-select-label">Select role</InputLabel>
                    <Select
                        labelId="role-select-label"
                        id="role"
                        name="role"
                        value={formik.values.role}
                        defaultValue={0}
                        label="Select role"
                        onChange={formik.handleChange}
                        error={
                            formik.touched.role && Boolean(formik.errors.role)
                        }
                    >
                        <MenuItem value={0}>Client</MenuItem>
                        <MenuItem value={1}>Business</MenuItem>
                        <MenuItem value={2}>Helper</MenuItem>
                        <MenuItem value={3}>Admin</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    sx={{ my: 1, width: "100%" }}
                    color="primary"
                    variant="contained"
                    type="submit"
                >
                    Create user
                </Button>
            </form>
        </Box>
    );
}
