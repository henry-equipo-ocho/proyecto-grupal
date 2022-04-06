import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sweetAlert from "sweetalert";
import { useAxiosPrivate } from "../Auth/useAxiosPrivate";
import FavCard from "./FavCard";

export default function Favorites() {
    const axiosPrivate = useAxiosPrivate();

    const [loading, setLoading] = useState(true);
    const [iti, setIti] = useState([]);
    const [itiName, setItiname] = useState("");

    const remove = async (itineraryName) => {
        try {
            await axiosPrivate.delete("/favorites", {
                data: {
                    itineraryName,
                },
            });
            sweetAlert(
                "Congrats",
                `Itinerary "${itineraryName}" deleted!`,
                "success"
            );
        } catch (e) {
            sweetAlert("Error", " " + e, "error");
        }
        getFavorites();
    };

    const getFavorites = async () => {
        try {
            const response = await axiosPrivate.get("/favorites");
            setIti([...response.data.data]);
            setLoading(false);
        } catch (e) {
            sweetAlert("Error", "Error to loading data, please try", "error");
        }
    };

    useEffect(() => {
        document.title = "Eztinerary - User Dashboard - Itineraries";
        getFavorites();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            <Typography
                variant="h4"
                sx={{ marginTop: "15px", marginBottom: "10px" }}
            >
                Itineraries
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    flexDirection: "column",
                }}
            >
                {!loading ? (
                    iti.length ? (
                        iti.map((itinerary) => {
                            return (
                                <Accordion
                                    key={itinerary.name}
                                    sx={{
                                        my: 1,
                                        width: "90vw",
                                        border: "1px solid #CAE5CB",
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        <Typography>
                                            {itinerary.name}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Accordion
                                            key={itinerary.name + 1}
                                            sx={{
                                                my: 1,
                                                width: "50vw",
                                                border: "1px solid #CAE5CB",
                                            }}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                            >
                                                <Typography>
                                                    Edit itinerary
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <TextField
                                                        sx={{
                                                            ml: 1,
                                                            width: "75%",
                                                        }}
                                                        id="name"
                                                        name="name"
                                                        label="Change name of itinerary"
                                                        value={itiName}
                                                        onChange={(e) =>
                                                            setItiname(
                                                                (prev) =>
                                                                    (prev =
                                                                        e.target
                                                                            .value)
                                                            )
                                                        }
                                                    />
                                                    <Button sx={{ mx: 1 }}>
                                                        Change name
                                                    </Button>
                                                </Box>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            sx={{ display: "inline-block" }}
                                            onClick={() =>
                                                remove(itinerary.name)
                                            }
                                        >
                                            Remove itinerary
                                        </Button>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                            }}
                                        >
                                            {itinerary.activities.length ? (
                                                itinerary.activities.map(
                                                    (act, i) => (
                                                        <FavCard
                                                            key={act._id}
                                                            shorTDescription={
                                                                act.description
                                                            }
                                                            link={act.booking}
                                                            name={act.name}
                                                            price={
                                                                act.price_amount
                                                            }
                                                            currency={
                                                                act.price_currency
                                                            }
                                                            actID={act._id}
                                                            itName={
                                                                itinerary.name
                                                            }
                                                            pictures={
                                                                act.picture
                                                            }
                                                            loadFavs={
                                                                getFavorites
                                                            }
                                                        />
                                                    )
                                                )
                                            ) : (
                                                <Alert
                                                    severity="error"
                                                    sx={{
                                                        width: "100%",
                                                        my: 1,
                                                    }}
                                                >
                                                    <AlertTitle>
                                                        Activities
                                                    </AlertTitle>
                                                    No activities to display —{" "}
                                                    <strong>
                                                        <Link
                                                            to="/home"
                                                            style={{
                                                                textDecoration:
                                                                    "none",
                                                            }}
                                                        >
                                                            <Button>
                                                                Try add
                                                                activities here!
                                                            </Button>
                                                        </Link>
                                                    </strong>
                                                </Alert>
                                            )}
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>
                            );
                        })
                    ) : (
                        <Alert severity="error" sx={{ width: "100%", my: 1 }}>
                            <AlertTitle>Activities</AlertTitle>
                            No activities to display —{" "}
                            <strong>
                                <Link
                                    to="/home"
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button>Try add activities here!</Button>
                                </Link>
                            </strong>
                        </Alert>
                    )
                ) : (
                    <p
                        className="loader"
                        style={{ fontSize: "15px !important" }}
                    >
                        {" "}
                    </p>
                )}
            </Box>
        </Box>
    );
}
