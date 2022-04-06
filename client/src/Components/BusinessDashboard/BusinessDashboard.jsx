import AddCircleIcon from "@mui/icons-material/AddCircle";
import HomeIcon from "@mui/icons-material/Home";
import LinkIcon from "@mui/icons-material/Link";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MenuIcon from "@mui/icons-material/Menu";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import Add from "./Add";
import Listar from "./List";

export default function BusinessDashboard() {
    const history = useNavigate();

    const [loading, setLoading] = useState(true);

    const verify = async () => {
        try {
            const data = JSON.parse(localStorage.getItem("data")).role;
            if (data === 1) {
                return setLoading(false);
            }
            history("/home");
        } catch (e) {
            history("/home");
        }
    };

    useEffect(() => {
        setLoading(true);
        verify();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [state, setState] = useState(false);

    const [page, setPage] = useState("dashboard");

    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setState(open);
    };

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem button onClick={() => history("/home")}>
                    <ListItemIcon>
                        <LinkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Go to Home" />
                </ListItem>
                <ListItem button onClick={() => history("/")}>
                    <ListItemIcon>
                        <LinkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Go to Landing Page" />
                </ListItem>
                <ListItem button onClick={() => history("/dashboard")}>
                    <ListItemIcon>
                        <LinkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Go to User dashboard" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button onClick={() => setPage("dashboard")}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button onClick={() => setPage("add")}>
                    <ListItemIcon>
                        <AddCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add activities" />
                </ListItem>
                <ListItem button onClick={() => setPage("listar")}>
                    <ListItemIcon>
                        <ListAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="List my activities" />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            <NavBar />
            <Container>
                {!loading ? (
                    <>
                        <Box>
                            <Button
                                onClick={toggleDrawer(true)}
                                sx={{
                                    position: "fixed",
                                    left: "20px",
                                    marginLeft: "5px",
                                }}
                                color="primary"
                                variant="contained"
                            >
                                <MenuIcon />
                            </Button>
                            <SwipeableDrawer
                                anchor="left"
                                open={state}
                                onClose={toggleDrawer(false)}
                                onOpen={toggleDrawer(true)}
                            >
                                {list()}
                            </SwipeableDrawer>
                        </Box>
                        <Container
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: "20px",
                                marginTop: "5px",
                                background: "white",
                                borderRadius: "10px",
                            }}
                        >
                            {page === "dashboard" ? (
                                <Box>
                                    <Typography variant="h3">
                                        Business Dashboard
                                    </Typography>
                                    <Box
                                        sx={{
                                            padding: "20px",
                                            border: "1px solid #CAE5CB",
                                            borderRadius: "10px",
                                            margin: "15px",
                                        }}
                                    >
                                        <Typography>
                                            Welcome to your Dashboard!
                                        </Typography>
                                        <Typography>
                                            Here, you can{" "}
                                            <strong>
                                                view, edit, add or delete
                                            </strong>{" "}
                                            your activities!
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            sx={{ marginTop: "20px" }}
                                        >
                                            Thanks for trusting us!
                                        </Typography>
                                    </Box>
                                    <Alert severity="info">
                                        <AlertTitle>Important</AlertTitle>
                                        <Typography>
                                            At left is menu, or{" "}
                                            <Button
                                                onClick={toggleDrawer(true)}
                                            >
                                                open
                                            </Button>{" "}
                                            menu and select an option.
                                        </Typography>
                                    </Alert>
                                </Box>
                            ) : page === "add" ? (
                                <Add />
                            ) : page === "listar" ? (
                                <Listar />
                            ) : (
                                <Alert
                                    severity="error"
                                    sx={{ padding: "30px" }}
                                >
                                    <Typography variant="h5">
                                        Page not found
                                    </Typography>
                                </Alert>
                            )}
                        </Container>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "10px",
                            }}
                        >
                            <Typography className="footer">
                                <span style={{ color: "black" }}>
                                    Business dashboard 0.0.1 -{" "}
                                    <strong>Eztinerary</strong>
                                </span>
                            </Typography>
                        </Box>
                    </>
                ) : null}
            </Container>
        </>
    );
}
