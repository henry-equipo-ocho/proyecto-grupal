import AddCircleIcon from "@mui/icons-material/AddCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";
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
import Add from "./Actividades/Add";
import Listar from "./Actividades/Listar";

export default function Actividades() {
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
                    Activities Dashboard
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
                                <AlertTitle>Activities Panel</AlertTitle>
                                Here you'll have control of{" "}
                                <strong>all of the platform's activities,</strong>{" "}
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
                                            <AddCircleIcon
                                                sx={{ fontSize: "35px" }}
                                            />
                                        </Typography>
                                        <Typography
                                            variant="h5"
                                            component="div"
                                        >
                                            Add activity
                                        </Typography>
                                        <Typography
                                            sx={{ mb: 1.5 }}
                                            color="text.secondary"
                                        >
                                            If you want to add an activity to
                                            the database,
                                            <br />
                                            click on the link.
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            size="small"
                                            onClick={() => setPage("add")}
                                        >
                                            Add activity
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
                                            <ListAltIcon
                                                sx={{ fontSize: "35px" }}
                                            />
                                        </Typography>
                                        <Typography
                                            variant="h5"
                                            component="div"
                                        >
                                            List activities
                                        </Typography>
                                        <Typography
                                            sx={{ mb: 1.5 }}
                                            color="text.secondary"
                                        >
                                            If you want to see all the activities in
                                            the database,
                                            <br />
                                            click on the link.
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            size="small"
                                            onClick={() => setPage("list")}
                                        >
                                            List activities
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
