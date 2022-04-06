import React from "react";
import { Link } from "react-router-dom";
import logo from "../Media/Logo.png";
import travel from "../Media/travel.m4v";
import "./Css/LandingPage.css";

export default function LandingPage() {
    return (
        <div className="containerLanding" data-testid="title">
            <video className="video" src={travel} autoPlay loop muted />
            <div className="textContainer">
                <center>
                    <img src={logo} alt="not found" />
                </center>
                <center>
                    <h1>Let's travel around Latin America!</h1>
                </center>
                <p className="parrafo">
                    Browse through lots of activities in many countries, search for specific topics, and filter by location and/or price {"\n"}
                    Create personalized itineraries before traveling around Latin America's main cities! {"\n"}
                    Save activities you'd like to remember when being in Latin America,
                    and have an unforgettable travel experience!
                </p>
                <center>
                    <Link to={"/home"}>
                        <button className="landingButton">Let's go!</button>
                    </Link>
                </center>
            </div>
        </div>
    );
}
