import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import * as yup from "yup";
import { useAxiosPrivate } from "../../../Auth/useAxiosPrivate";
import countries from "../../../Register/countries";
import "../loader.css";
import "../table.css";

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

export default function Listar() {
    const axios = useAxiosPrivate();

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [activities, setActivities] = useState([]);
    const [activitiesBackup, setActivitiesBackup] = useState([]);
    const [activityToFind, setActivityToFind] = useState("");

    useEffect(() => {
        setLoading(true);
        loadActivities();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadActivities = async () => {
        try {
            const datos = await axios.get("/admin/activities");
            setActivities(datos.data.data);
            setActivitiesBackup(datos.data.data);
            setLoading(false);
        } catch (e) {
            Swal.fire({
                title: `Error`,
                text: `Something happened while loading the activities (${e})`,
                icon: "error",
                color: "white",
                background: "#00498b",
                confirmButtonColor: "#24c59c",
            });
        }
    };

    const handleDelete = (_id) => {
        Swal.fire({
            title: `Are you sure?`,
            text: "You won't be able to recover this activity!",
            icon: "warning",
            color: "white",
            background: "#00498b",
            showCancelButton: true,
            confirmButtonColor: "#a9e8bc",
            cancelButtonColor: "#24c59c",
            confirmButtonText: "Yes, I am sure!",
            cancelButtonText: "No, cancel it!",
            dangerMode: true,
        }).then(async function (result) {
            if (result.isConfirmed) {
                try {
                    await axios.delete("/admin/delete/activity", {
                        data: { id: _id },
                    });

                    Swal.fire({
                        title: `Success`,
                        text: "Successfully deleted the activity",
                        icon: "success",
                        color: "white",
                        background: "#00498b",
                        confirmButtonColor: "#24c59c",
                    });
                    setOpen(false);
                    setLoading(true);
                    loadActivities();
                } catch (e) {
                    Swal.fire({
                        title: `Error`,
                        text: `Something happened while deleting the activity (${e})`,
                        icon: "error",
                        color: "white",
                        background: "#00498b",
                        confirmButtonColor: "#24c59c",
                    });
                }
            } else {
                Swal.fire({
                    title: `Canceled`,
                    text: "Action canceled",
                    icon: "error",
                    color: "white",
                    background: "#00498b",
                    confirmButtonColor: "#24c59c",
                });
            }
        });
    };

    const formik = useFormik({
        initialValues: {
            id: "",
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
                await axios.put("/admin/update/activity", values);
                Swal.fire({
                    title: `Success`,
                    text: "Successfully edited the activity",
                    icon: "success",
                    color: "white",
                    background: "#00498b",
                    confirmButtonColor: "#24c59c",
                });
                setOpen(false);
                setLoading(true);
                loadActivities();
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

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const searchActivity = () => {
        handleChangePage(null, 0);
        const users_data = activitiesBackup.filter((act) =>
            act.name.toLowerCase().includes(activityToFind.toLowerCase())
        );
        setActivities(users_data);
    };

    const handleDetail = (
        _id,
        name,
        description,
        picture,
        city,
        country,
        price_currency,
        price_amount,
        booking
    ) => {
        Swal.fire({
            title: name,
            text: `ID: ${_id}
            Description: ${description}
            Country: ${country}
            City: ${city}
            Currency: ${price_currency}
            Price: ${price_amount}`,
            icon: picture,
            color: "white",
            background: "#00498b",
            showCancelButton: true,
            confirmButtonColor: "#a9e8bc",
            cancelButtonColor: "#24c59c",
            confirmButtonText: "Visit site",
            cancelButtonText: "Back",
        }).then(function (result) {
            if (result.isConfirmed) {
                window.open(booking, "_blank");
            }
        });
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                my: 2,
            }}
        >
            <Typography variant="h5" sx={{ my: 2 }}>
                List activities
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <form method="POST" onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <TextField
                            sx={{ my: 1, width: "75vw" }}
                            id="activityToFind"
                            name="activityToFind"
                            label="Activity to find"
                            value={activityToFind}
                            onChange={(e) => setActivityToFind(e.target.value)}
                        />
                        <Button
                            type="submit"
                            size="large"
                            variant="contained"
                            sx={{ mx: 1 }}
                            onClick={searchActivity}
                        >
                            Search
                        </Button>
                    </Box>
                </form>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    {!loading ? (
                        activities.length ? (
                            <Paper>
                                <TableContainer>
                                    <Table
                                        sx={{ minWidth: "83.6vw" }}
                                        size="small"
                                        aria-label="activities list table"
                                    >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">
                                                    ID
                                                </TableCell>
                                                <TableCell align="right">
                                                    Name
                                                </TableCell>
                                                <TableCell align="right">
                                                    City
                                                </TableCell>
                                                <TableCell align="right">
                                                    Currency
                                                </TableCell>
                                                <TableCell align="right">
                                                    Price
                                                </TableCell>
                                                <TableCell align="right">
                                                    Booking
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {activities
                                                .slice(
                                                    page * rowsPerPage,
                                                    page * rowsPerPage +
                                                        rowsPerPage
                                                )
                                                .map((act) => (
                                                    <TableRow
                                                        key={act._id}
                                                        hover
                                                    >
                                                        <TableCell align="left">
                                                            {act._id}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {act.name.slice(
                                                                0,
                                                                20
                                                            )}
                                                            ...
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {act.city}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {act.price_currency}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {act.price_amount}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {act.booking}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Button
                                                                onClick={() => {
                                                                    setOpen(
                                                                        true
                                                                    );
                                                                    formik.setValues(
                                                                        {
                                                                            id: act._id,
                                                                            name: act.name,
                                                                            description:
                                                                                act.description,
                                                                            picture:
                                                                                act.picture,
                                                                            city: act.city,
                                                                            country:
                                                                                act.country,
                                                                            price_currency:
                                                                                act.price_currency,
                                                                            price_amount:
                                                                                act.price_amount,
                                                                            booking:
                                                                                act.booking,
                                                                        }
                                                                    );
                                                                }}
                                                            >
                                                                <EditIcon />
                                                            </Button>
                                                            <Button
                                                                onClick={() =>
                                                                    handleDetail(
                                                                        act._id,
                                                                        act.name,
                                                                        act.description,
                                                                        act.picture,
                                                                        act.city,
                                                                        act.country,
                                                                        act.price_currency,
                                                                        act.price_amount,
                                                                        act.booking
                                                                    )
                                                                }
                                                            >
                                                                <VisibilityIcon />
                                                            </Button>
                                                            <Button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        act._id
                                                                    )
                                                                }
                                                            >
                                                                <DeleteOutlineIcon />
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={activities.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={
                                        handleChangeRowsPerPage
                                    }
                                />
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Button
                                        onClick={() => {
                                            setLoading(true);
                                            loadActivities();
                                        }}
                                    >
                                        Reload activities
                                    </Button>
                                </Box>
                            </Paper>
                        ) : (
                            <Alert
                                severity="info"
                                sx={{ width: "100%", my: 2 }}
                            >
                                <AlertTitle>Found activities</AlertTitle>
                                All activities will appear here.
                                <Button
                                    onClick={() => {
                                        setLoading(true);
                                        loadActivities();
                                    }}
                                >
                                    Reload activities
                                </Button>
                            </Alert>
                        )
                    ) : (
                        <div className="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    )}
                </Box>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit data from {formik.values.name}</DialogTitle>
                <DialogContent>
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
                                    formik.touched.name &&
                                    Boolean(formik.errors.name)
                                }
                                helperText={
                                    formik.touched.name && formik.errors.name
                                }
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
                                    formik.touched.picture &&
                                    formik.errors.picture
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
                                    formik.touched.city &&
                                    Boolean(formik.errors.city)
                                }
                                helperText={
                                    formik.touched.city && formik.errors.city
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
                                    formik.touched.booking &&
                                    formik.errors.booking
                                }
                            />
                        </Box>
                        <Button
                            sx={{ my: 1, width: "100%" }}
                            color="primary"
                            variant="contained"
                            type="submit"
                        >
                            Edit activity
                        </Button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
