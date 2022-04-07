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
import { useAxiosPrivate } from "../Auth/useAxiosPrivate";
import countries from "../Register/countries";

const validationSchema = yup.object({
    name: yup
        .string("Enter a name")
        .min(5, "Name should be of minimum 5 characters length")
        .required("Name is required"),
    description: yup
        .string("Enter a description")
        .min(8, "Description should be of minimum 8 characters length")
        .required("Description is required"),
    country: yup
        .string("Select country")
        .min(3, "Enter a valid country")
        .required("Country is required"),
    picture: yup
        .string("Enter link of a picture")
        .min(2, "Enter a valid link (more than 2 chars)")
        .required("Picture is required"),
    city: yup
        .string("Enter city")
        .min(2, "City should be of minimum 2 characters length")
        .required("City is required"),
    price_amount: yup
        .string("Entre price of activity")
        .required("Price is required"),
    booking: yup.string("Enter link of activity").required("Link is required"),
});

export default function Add() {
    const axios = useAxiosPrivate();

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            picture: "",
            city: "",
            country: "",
            price_currency: "USD",
            price_amount: "",
            booking: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                await axios.post("/business/activities", values);
                Swal.fire({
                    title: `Success`,
                    text: "Successfully added the activity",
                    icon: "success",
                    color: "white",
                    background: "#00498b",
                    confirmButtonColor: "#24c59c",
                });
                formik.resetForm();
            } catch (e) {
                Swal.fire({
                    title: `Error`,
                    text: `${e.response.data.errors.message}`,
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
                flexWrap: "wrap",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Typography variant="h4">Add an activity</Typography>
            <form onSubmit={formik.handleSubmit}>
                <Box>
                    <TextField
                        sx={{ my: 1, width: "100%" }}
                        id="name"
                        name="name"
                        label="Activity name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.name && Boolean(formik.errors.name)
                        }
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                        sx={{ my: 1, width: "100%" }}
                        id="description"
                        name="description"
                        label="Description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.description &&
                            Boolean(formik.errors.description)
                        }
                        helperText={
                            formik.touched.description &&
                            formik.errors.description
                        }
                    />
                </Box>
                <Box>
                    <TextField
                        sx={{ my: 1, width: "100%" }}
                        id="picture"
                        name="picture"
                        label="Picture link"
                        value={formik.values.picture}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.picture &&
                            Boolean(formik.errors.picture)
                        }
                        helperText={
                            formik.touched.picture && formik.errors.picture
                        }
                    />
                </Box>
                <Box>
                    <TextField
                        sx={{ my: 1, width: "100%" }}
                        id="city"
                        name="city"
                        label="City"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.city && Boolean(formik.errors.city)
                        }
                        helperText={formik.touched.city && formik.errors.city}
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
                <Box>
                    <TextField
                        sx={{ my: 1, width: "100%" }}
                        id="price_amount"
                        name="price_amount"
                        label="Price"
                        value={formik.values.price_amount}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.price_amount &&
                            Boolean(formik.errors.price_amount)
                        }
                        helperText={
                            formik.touched.price_amount &&
                            formik.errors.price_amount
                        }
                    />
                </Box>
                <Box>
                    <TextField
                        sx={{ my: 1, width: "100%" }}
                        id="booking"
                        name="booking"
                        label="Link to Activity"
                        value={formik.values.booking}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.booking &&
                            Boolean(formik.errors.booking)
                        }
                        helperText={
                            formik.touched.booking && formik.errors.booking
                        }
                    />
                </Box>
                <Button
                    sx={{ my: 1, width: "100%" }}
                    color="primary"
                    variant="contained"
                    type="submit"
                >
                    Create activity
                </Button>
            </form>
        </Box>
    );
}
