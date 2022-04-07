import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import logo from "../Media/Logo.png";
import { useAxiosPrivate } from "./Auth/useAxiosPrivate";
import "./Css/Success.css";
import Footer from "./Footer";

export default function Success() {
    const loading = useSelector((state) => state.loading)
    const axiosPrivate = useAxiosPrivate();
    const [searchParams] = useSearchParams();
    const paypalToken = searchParams.get("token");

    const [detail, setDetail] = useState({
        nombre: "",
        email: "",
        buydate: "",
        expira: "",
        tier: 0,
    });

    async function getPaypalOrder() {
        const paypalorder = await axiosPrivate.get(
            `/payment/capture?token=${paypalToken}`
        );
        const buydate = new Date(
            paypalorder.data.data.buyDate
        ).toLocaleString();
        const expdate = new Date(
            paypalorder.data.data.expireDate
        ).toLocaleString();
        setDetail({
            nombre: paypalorder.data.data.name,
            email: paypalorder.data.data.email,
            buydate: buydate,
            expira: expdate,
            tier: paypalorder.data.data.tier,
        });
    }

    useEffect(() => getPaypalOrder(), []);

    return (
        <div>
            <header className="header">
                <div>
                    <img src={logo} alt="Not found" />
                </div>
                <div>
                    <button>
                        <a href="/dashboard">Dashboard</a>
                    </button>
                </div>
            </header>

                <div className="detailShop">
                    <center>
                        <h1>Thanks, {detail.nombre}!</h1>
                        This are your purchase details:
                        <ul>
                            <label className="tag">Your name:</label>
                            <li>{detail.nombre}</li>
                            <label className="tag">Your email:</label>
                            <li> {detail.email}</li>
                            <label className="tag">You subscribed to: </label>
                            <li>
                                {detail.tier === 1
                                    ? "Business Basic"
                                    : detail.tier === 2
                                        ? "Business Standard"
                                        : "Business Premium"}
                            </li>
                            <label className="tag">You subscribed on: </label>
                            <li>{detail.buydate}</li>
                            <label className="tag">
                                Your subscription ends on:
                            </label>
                            <li> {detail.expira}</li>
                        </ul>
                    </center>
                </div>
            <Footer />
        </div>
    );
}
