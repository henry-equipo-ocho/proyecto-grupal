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
});

export default function Listar() {
    const axios = useAxiosPrivate();

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [users, setUsers] = useState([]);
    const [usersBackup, setUsersBackup] = useState([]);
    const [userToFind, setUserToFind] = useState("");

    useEffect(() => {
        setLoading(true);
        loadUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadUsers = async () => {
        try {
            const datos = await axios.get("/admin/users");
            setUsers(datos.data.data);
            setUsersBackup(datos.data.data);
            setLoading(false);
        } catch (e) {
            Swal.fire({
                title: `Error`,
                text: `Something happened while loading the users (${e})`,
                icon: "error",
                color: "white",
                background: "#00498b",
                confirmButtonColor: "#24c59c",
            });
        }
    };

    const handleDetail = (
        _id,
        name,
        surname,
        email,
        country,
        subscribed,
        verified,
        role
    ) => {
        Swal.fire({
            title: `Detail of ${name} ${surname}`,
            text: `ID: ${_id}
            Name: ${name}
            Surname: ${surname}
            Email: ${email}
            Country: ${country}
            Subscribed: ${subscribed}
            Verified: ${verified}
            Role: ${
                role === 0
                    ? "User"
                    : role === 1
                    ? "Business"
                    : role === 2
                    ? "Helper"
                    : role === 3
                    ? "Admin"
                    : "Unknown"
            }`,
            color: "white",
            background: "#00498b"
        });
    };

    const handleDelete = (_id) => {
        Swal.fire({
            title: `Are you sure?`,
            text: "You won't be able to recover this user!",
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
                    await axios.delete("/admin/delete/user", {
                        data: { id: _id },
                    });

                    Swal.fire({
                        title: `Success`,
                        text: "Successfully deleted the user",
                        icon: "success",
                        color: "white",
                        background: "#00498b",
                        confirmButtonColor: "#24c59c",
                    });
                    setOpen(false);
                    setLoading(true);
                    setPage(0);
                    loadUsers();
                } catch (e) {
                    Swal.fire({
                        title: `Error`,
                        text: `Something happened while deleting the user (${e})`,
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
            surname: "",
            country: "",
            email: "",
            password: "",
            activeSubscription: false,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                let datos;
                if (values.password) {
                    datos = values;
                } else {
                    delete formik.values.password;
                    datos = values;
                }

                await axios.put("/admin/update/user", datos);
                Swal.fire({
                    title: `Success`,
                    text: "Successfully edited the user",
                    icon: "success",
                    color: "white",
                    background: "#00498b",
                    confirmButtonColor: "#24c59c",
                });
                setOpen(false);
                setLoading(true);
                setPage(0);
                loadUsers();
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

    const searchUser = () => {
        handleChangePage(null, 0);
        const users_data = usersBackup.filter((user) =>
            (user.name + " " + user.surname)
                .toLowerCase()
                .includes(userToFind.toLowerCase())
        );
        setUsers(users_data);
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
                List users
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
                            id="userToFind"
                            name="userToFind"
                            label="Find user by name"
                            value={userToFind}
                            onChange={(e) => setUserToFind(e.target.value)}
                        />
                        <Button
                            type="submit"
                            size="large"
                            variant="contained"
                            sx={{ mx: 1 }}
                            onClick={searchUser}
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
                        users.length ? (
                            <Paper>
                                <TableContainer>
                                    <Table
                                        sx={{ minWidth: "83.6vw" }}
                                        size="small"
                                        aria-label="user list table"
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
                                                    Surname
                                                </TableCell>
                                                <TableCell align="right">
                                                    Email
                                                </TableCell>
                                                <TableCell align="right">
                                                    Actions
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {users
                                                .slice(
                                                    page * rowsPerPage,
                                                    page * rowsPerPage +
                                                        rowsPerPage
                                                )
                                                .map((user) => (
                                                    <TableRow
                                                        key={user._id}
                                                        hover
                                                    >
                                                        <TableCell align="left">
                                                            {user._id}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {user.name}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {user.surname}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {user.email}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Button
                                                                onClick={() => {
                                                                    setOpen(
                                                                        true
                                                                    );
                                                                    formik.setValues(
                                                                        {
                                                                            id: user._id,
                                                                            name: user.name,
                                                                            surname:
                                                                                user.surname,
                                                                            country:
                                                                                user.country,
                                                                            email: user.email,
                                                                            password:
                                                                                "",
                                                                            activeSubscription:
                                                                                user.activeSubscription,
                                                                        }
                                                                    );
                                                                }}
                                                            >
                                                                <EditIcon />
                                                            </Button>
                                                            <Button
                                                                onClick={() =>
                                                                    handleDetail(
                                                                        user._id,
                                                                        user.name,
                                                                        user.surname,
                                                                        user.email,
                                                                        user.country,
                                                                        user.activeSubscription,
                                                                        user.isVerified,
                                                                        user.role
                                                                    )
                                                                }
                                                            >
                                                                <VisibilityIcon />
                                                            </Button>
                                                            <Button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        user._id
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
                                    count={users.length}
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
                                            loadUsers();
                                        }}
                                    >
                                        Reload users
                                    </Button>
                                </Box>
                            </Paper>
                        ) : (
                            <Alert
                                severity="info"
                                sx={{ width: "100%", my: 2 }}
                            >
                                <AlertTitle>Found users</AlertTitle>
                                All users will appear here.
                                <Button
                                    onClick={() => {
                                        setLoading(true);
                                        loadUsers();
                                    }}
                                >
                                    Reload users
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
                <DialogTitle>Edit {formik.values.name}'s data</DialogTitle>
                <DialogContent>
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
                                    formik.touched.name && formik.errors.name
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
                                    formik.touched.email && formik.errors.email
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
                        <FormControl sx={{ my: 1, width: "100%" }}>
                            <InputLabel id="subs-select-label">
                                Select subscription type
                            </InputLabel>
                            <Select
                                labelId="subs-select-label"
                                id="activeSubscription"
                                name="activeSubscription"
                                value={formik.values.activeSubscription}
                                defaultValue={false}
                                label="Select subscription type"
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.activeSubscription &&
                                    Boolean(formik.errors.activeSubscription)
                                }
                            >
                                <MenuItem value={false}>No</MenuItem>
                                <MenuItem value={true}>Yes</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            sx={{ my: 1, width: "100%" }}
                            color="primary"
                            variant="contained"
                            type="submit"
                        >
                            Edit user
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
