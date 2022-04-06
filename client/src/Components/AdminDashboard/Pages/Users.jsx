import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Add from "./Users/Add";
import Listar from "./Users/Listar";

export default function Users() {
    const [page, setPage] = useState("index");

    return (
        <center>
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "30px",
                    background: "white",
                    margin: "10px",
                    borderRadius: "5px",
                }}
            >
                <Typography variant="h4" sx={{ mb: 1 }}>
                    Users Dashboard
                </Typography>
                <Box>
                    {page === "index" ? (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Alert severity="warning" sx={{ width: "100%" }}>
                                <AlertTitle>Users Panel</AlertTitle>
                                Here you'll have control of{" "}
                                <strong>all of the platform's users,</strong>{" "}
                                <strong>be careful!.</strong>
                            </Alert>
                            <Typography variant="h5" sx={{ my: 2 }}>
                                Available Actions
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    padding: "10px",
                                }}
                            >
                                <Card
                                    sx={{ margin: "10px" }}
                                    onClick={() => setPage("add")}
                                >
                                    <CardContent>
                                        <Typography
                                            color="text.secondary"
                                            gutterBottom
                                        >
                                            <PersonAddAltIcon
                                                sx={{ fontSize: "35px" }}
                                            />
                                        </Typography>
                                        <Typography
                                            variant="h5"
                                            component="div"
                                        >
                                            Add user
                                        </Typography>
                                        <Typography
                                            sx={{ mb: 1.5 }}
                                            color="text.secondary"
                                        >
                                            If you want to add a user to the
                                            database,
                                            <br />
                                            click on the link.
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            size="small"
                                            onClick={() => setPage("add")}
                                        >
                                            Add user
                                        </Button>
                                    </CardActions>
                                </Card>
                                <Card
                                    sx={{ margin: "10px" }}
                                    onClick={() => setPage("list")}
                                >
                                    <CardContent>
                                        <Typography
                                            color="text.secondary"
                                            gutterBottom
                                        >
                                            <SupervisedUserCircleIcon
                                                sx={{ fontSize: "35px" }}
                                            />
                                        </Typography>
                                        <Typography
                                            variant="h5"
                                            component="div"
                                        >
                                            List users
                                        </Typography>
                                        <Typography
                                            sx={{ mb: 1.5 }}
                                            color="text.secondary"
                                        >
                                            If you want to see all the users in the
                                            database,
                                            <br />
                                            click on the link.
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            size="small"
                                            onClick={() => setPage("list")}
                                        >
                                            List users
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Box>
                        </Box>
                    ) : page === "add" ? (
                        <Box>
                            <Button
                                variant="contained"
                                onClick={() => setPage("index")}
                            >
                                Back
                            </Button>
                            <Add />
                        </Box>
                    ) : page === "list" ? (
                        <Box>
                            <Button
                                variant="contained"
                                onClick={() => setPage("index")}
                            >
                                Back
                            </Button>
                            <Listar />
                        </Box>
                    ) : null}
                </Box>
            </Container>
        </center>
    );
}
