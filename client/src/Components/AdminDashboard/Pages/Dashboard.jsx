import BarChartIcon from "@mui/icons-material/BarChart";
import GroupIcon from "@mui/icons-material/Group";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import Contexto from "../Context/context";

export default function Dashboard() {
    const { reducer } = useContext(Contexto);

    return (
        <center>
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "30px",
                    background: "white",
                    margin: "10px",
                    borderRadius: "5px",
                }}
            >
                <Typography variant="h4" sx={{ mb: 1 }}>
                    Admin Dashboard
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                    }}
                >
                    <Alert
                        severity="info"
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <AlertTitle>Welcome to Admin Dashboard!</AlertTitle>
                        Here you can edit, modify, view the statistics for the —{" "}
                        <strong>entire site!</strong>
                    </Alert>
                </Box>
                <Typography variant="h5" sx={{ my: 1 }}>
                    What do you want to do?
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        padding: "10px",
                    }}
                >
                    <Card
                        sx={{ margin: "10px" }}
                        onClick={() => reducer("SET_PAGE", "users")}
                    >
                        <CardContent>
                            <Typography color="text.secondary" gutterBottom>
                                <GroupIcon sx={{ fontSize: "35px" }} />
                            </Typography>
                            <Typography variant="h5" component="div">
                                Users
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                In this panel you can edit view or delete
                                <br />
                                one or many users,
                                <br />
                                depending on the need.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                size="small"
                                onClick={() => reducer("SET_PAGE", "users")}
                            >
                                View Panel
                            </Button>
                        </CardActions>
                    </Card>
                    <Card
                        sx={{ margin: "10px" }}
                        onClick={() => reducer("SET_PAGE", "actividades")}
                    >
                        <CardContent>
                            <Typography color="text.secondary" gutterBottom>
                                <LocalActivityIcon sx={{ fontSize: "35px" }} />
                            </Typography>
                            <Typography variant="h5" component="div">
                                Activities
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                In this panel you can edit view or delete
                                <br />
                                one or many activities,
                                <br />
                                depending on the need.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                size="small"
                                onClick={() =>
                                    reducer("SET_PAGE", "actividades")
                                }
                            >
                                View Panel
                            </Button>
                        </CardActions>
                    </Card>
                    <Card
                        sx={{ margin: "10px" }}
                        onClick={() => reducer("SET_PAGE", "estadisticas")}
                    >
                        <CardContent>
                            <Typography color="text.secondary" gutterBottom>
                                <BarChartIcon sx={{ fontSize: "35px" }} />
                            </Typography>
                            <Typography variant="h5" component="div">
                                Statistics
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                In this panel you can view statistics
                                <br />
                                from page
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                size="small"
                                onClick={() =>
                                    reducer("SET_PAGE", "estadisticas")
                                }
                            >
                                View Panel
                            </Button>
                        </CardActions>
                    </Card>
                </Box>
            </Container>
        </center>
    );
}
