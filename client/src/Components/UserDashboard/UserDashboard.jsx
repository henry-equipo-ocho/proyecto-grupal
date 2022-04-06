import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAxiosPrivate } from "../Auth/useAxiosPrivate";
import Footer from "../Footer";
import { setUserName } from "../Redux/Actions/actions";
import { SET_TOKEN } from "../Redux/Actions/actions_types";
import EditProfile from "./EditProfile";
import Favorites from "./Favorites";

const pages = ["Favorites", "Edit profile", "Plans", "Logout"];

const UserDashboard = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();

    const role = JSON.parse(localStorage.getItem("data")).role;

    const isLogged =
        useSelector((state) => state.token) || localStorage.getItem("loggedIn")
            ? true
            : false;
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [currentPage, setCurrentPage] = useState("favorites");

    useEffect(() => {
        if (!isLogged) {
            history("/home");
        }
        document.title = "Eztinerary - User Dashboard";
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const logout = (e) => {
        window.localStorage.clear();
        dispatch(setUserName("Traveler"));
        axiosPrivate.get("/token/clear");
        dispatch({ type: SET_TOKEN, payload: "" });
        history("/home");
    };

    const handleCloseNavMenu = (e) => {
        switch (e.target.innerText.toLowerCase()) {
            case "logout": {
                logout(e);
                break;
            }
            case "favorites": {
                setCurrentPage("favorites");
                break;
            }
            case "edit profile": {
                setCurrentPage("edit profile");
                break;
            }
            default: {
                break;
            }
        }
        setAnchorElNav(null);
    };

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                        >
                            User Dashboard
                        </Typography>

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "flex", md: "none" },
                            }}
                        >
                            <IconButton
                                size="large"
                                aria-label="dashboard menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: "block", md: "none" },
                                }}
                            >
                                <MenuItem>
                                    <Link
                                        to="/home"
                                        style={{
                                            textDecoration: "none",
                                            color: "black",
                                        }}
                                    >
                                        <Typography>Home</Typography>
                                    </Link>
                                </MenuItem>
                                {pages.map((page) => (
                                    <MenuItem
                                        key={page}
                                        onClick={(e) =>
                                            page !== "Plans"
                                                ? handleCloseNavMenu(e)
                                                : history("/plans")
                                        }
                                    >
                                        {page}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                flexGrow: 1,
                                display: { xs: "flex", md: "none" },
                            }}
                        >
                            UserDashboard
                        </Typography>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "none", md: "flex" },
                            }}
                        >
                            <Link to="/home" style={{ textDecoration: "none" }}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: "white",
                                        display: "block",
                                    }}
                                >
                                    Home
                                </Button>
                            </Link>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={(e) =>
                                        page !== "Plans"
                                            ? handleCloseNavMenu(e)
                                            : history("/plans")
                                    }
                                    sx={{
                                        my: 2,
                                        color: "white !important",
                                        display: "block",
                                    }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>
                        {role === 1 ? (
                            <Box sx={{ flexGrow: 0 }}>
                                <Link
                                    to="/mybusiness"
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button
                                        sx={{
                                            my: 2,
                                            color: "white !important",
                                            display: "block",
                                        }}
                                    >
                                        Business Dashboard
                                    </Button>
                                </Link>
                            </Box>
                        ) : null}
                    </Toolbar>
                </Container>
            </AppBar>
            <Box>
                {currentPage === "favorites" ? <Favorites /> : <EditProfile />}
                <Footer />
            </Box>
        </>
    );
};

export default UserDashboard;
