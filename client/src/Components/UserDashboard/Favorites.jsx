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
import Swal from "sweetalert2";
import { useAxiosPrivate } from "../Auth/useAxiosPrivate";
import FavCard from "./FavCard";

export default function Favorites() {
    const axiosPrivate = useAxiosPrivate();

    const [loading, setLoading] = useState(true);
    const [iti, setIti] = useState([]);
    const [itiName, setItiname] = useState("");

    const remove = async (itineraryName) => {
        Swal.fire({
            title: `Are you sure?`,
            text: "You won't be able to recover this itinerary!",
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
                    axiosPrivate.delete("/favorites", {
                        data: {
                            itineraryName,
                        },
                    });

                    Swal.fire({
                        title: `Success`,
                        text: "Successfully deleted the itinerary",
                        icon: "success",
                        color: "white",
                        background: "#00498b",
                        confirmButtonColor: "#24c59c",
                    });
                    setLoading(true);
                } catch (e) {
                    Swal.fire({
                        title: `Error`,
                        text: `Something happened while deleting the itinerary (${e})`,
                        icon: "error",
                        color: "white",
                        background: "#00498b",
                        confirmButtonColor: "#24c59c",
                    });
                } finally {
                    getFavorites();
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

    const getFavorites = async () => {
        try {
            const response = await axiosPrivate.get("/favorites");
            setIti([...response.data.data]);
            setLoading(false);
        } catch (e) {
            Swal.fire({
                title: `Error`,
                text: `Something happened while loading the itineraries (${e})`,
                icon: "error",
                color: "white",
                background: "#00498b",
                confirmButtonColor: "#24c59c",
            });
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
                                                                Go add some
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
