import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import * as yup from "yup";
import { useAxiosPrivate } from "../Auth/useAxiosPrivate";
import countries from "../Register/countries";

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

export default function EditProfile() {
    const axiosPrivate = useAxiosPrivate();

    const datosIniciales = {};

    useEffect(() => {
        document.title = "Eztinerary - User Dashboard - Edit profile";
        (async function cargarData() {
            try {
                const response = await axiosPrivate.get("/update");
                datosIniciales.name = response.data.data.name;
                datosIniciales.surname = response.data.data.surname;
                datosIniciales.email = response.data.data.email;
                datosIniciales.country = response.data.data.country;
            } catch (e) {
                console.log(e);
            }

            formik.setValues({
                name: datosIniciales.name,
                surname: datosIniciales.surname,
                country: datosIniciales.country,
                email: datosIniciales.email,
                password: "",
            });
            console.clear();
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formik = useFormik({
        initialValues: {
            name: datosIniciales.name,
            surname: datosIniciales.surname,
            country: "",
            email: datosIniciales.email,
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const data = {
                    name: values.name,
                    surname: values.surname,
                    email: values.email,
                    country: values.country,
                };
                await axiosPrivate.post("/update", data);

                await axiosPrivate.post("update/password", {
                    password: values.password,
                });

                Swal.fire({
                    title: `Success`,
                    text: "Successfully edited your profile!",
                    icon: "success",
                    color: "white",
                    background: "#00498b",
                    confirmButtonColor: "#24c59c",
                });
            } catch (e) {
                Swal.fire({
                    title: `Error`,
                    text: `${e}`,
                    icon: "error",
                    color: "white",
                    background: "#00498b",
                    confirmButtonColor: "#24c59c",
                });            }
        },
    });

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "30px",
                background: "white",
                margin: "10px",
                borderRadius: "5px",
            }}
        >
            <Typography variant="h4" sx={{ marginTop: "15px" }}>
                Edit profile
            </Typography>
            <Alert severity="info" sx={{ my: 1 }}>
                Change all the fields if you need to
            </Alert>
            <form onSubmit={formik.handleSubmit}>
                <Box>
                    <TextField
                        sx={{ my: 1, width: "100%" }}
                        id="name"
                        name="name"
                        label={formik.values.name}
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
                        label={formik.values.surname}
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
                        hiddenLabel
                        name="email"
                        label={formik.values.email}
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
                <Button
                    sx={{ my: 1, width: "100%" }}
                    color="primary"
                    variant="contained"
                    type="submit"
                >
                    Change data
                </Button>
            </form>
        </Box>
    );
}
