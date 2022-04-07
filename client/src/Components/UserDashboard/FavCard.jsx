import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";
import Swal from "sweetalert2";
import { useAxiosPrivate } from "../Auth/useAxiosPrivate";

export default function ActivityCard({
    name,
    pictures,
    shorTDescription,
    price,
    currency,
    link,
    loadFavs,
    actID,
    itName,
}) {
    const axiosPrivate = useAxiosPrivate();

    const remove = async (activityID, itineraryName) => {
        try {
            await axiosPrivate.delete("/favorites", {
                data: {
                    activityID,
                    itineraryName,
                },
            });
            Swal.fire({
                title: `Success`,
                text: `Successfully deleted "${name.slice(
                    0,
                    15
                )}..." from itinerary "${itName}"`,
                icon: "success",
                color: "white",
                background: "#00498b",
                confirmButtonColor: "#24c59c",
            });
        } catch (e) {
            Swal.fire({
                title: `Error`,
                text: `Something happened while deleting the activity (${e})`,
                icon: "error",
                color: "white",
                background: "#00498b",
                confirmButtonColor: "#24c59c",
            });        }
        loadFavs();
    };

    return (
        <Card
            sx={{
                maxWidth: 300,
                margin: "10px",
                padding: "10px",
                border: "solid 1px #CAE5CB",
            }}
        >
            <CardMedia
                component="img"
                height="130"
                alt="Turismo"
                sx={{ borderRadius: "5px" }}
                image={pictures}
            />
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <Typography gutterBottom variant="h6" component="div">
                    {name}
                </Typography>
                <Typography color="text.secondary">
                    {shorTDescription.slice(0, 50)}...{" "}
                    <a href={link} target="_blank" rel="noreferrer">
                        read more
                    </a>
                </Typography>
                <Typography variant="body1">
                    Price: {price} {currency}
                </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: "center" }}>
                <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={() => remove(actID, itName)}
                >
                    Remove from itinerary
                </Button>
            </CardActions>
        </Card>
    );
}
