import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React from "react";

export default function ActivityCard({ nombre, imagen, handleDetail, id }) {
    async function watchedOrBookeedTimes(id) {
        try {
            await axios.post("http://localhost:3001/activities/watched", {
                type: "watched",
                id: id,
            });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Card sx={{ maxWidth: 400, border: 1 }}>
            <CardMedia
                component="img"
                height="300"
                alt="Turismo"
                image={imagen}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {nombre}
                </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: "center" }}>
                <button className="shopButton" onClick={() => {handleDetail(id); watchedOrBookeedTimes(id);}}>
                    More info
                </button>
            </CardActions>
        </Card>
    );
}
