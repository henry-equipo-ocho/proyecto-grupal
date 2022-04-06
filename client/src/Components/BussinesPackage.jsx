import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import benefits from "../Media/benefits.png";
import logo from "../Media/Logo.png";
import "./Css/BussinesPackage.css";
import Footer from "./Footer";
import LoginForm from "./LoginForm";
import PaymentForm from "./PaymentForm";

export default function BussinesPackage() {
    const isLogged = useSelector((state) => state.token)
        ? true
        : false || localStorage.getItem("loggedIn")
        ? true
        : false;

    function handleClickLogout() {
        Swal.fire({
            title: "Sorry!",
            text: "Please log in to continue",
            icon: "info",
            color: "white",
            background: "#00498b",
            confirmButtonText: '<a href="/home">Login</a>',
            confirmButtonColor: "#24c59c",
        });
    }

    return (
        <div className="pageB">
            {isLogged ? (
                <>
                    <header className="header">
                        <div>
                            <img src={logo} alt="Not found" />
                        </div>
                        <div>
                            <h1>Business plans (monthly billed)</h1>
                        </div>
                        <div>
                            <button className="buttonNav">
                                <a href="/dashboard">Dashboard</a>
                            </button>
                            <button>
                                <a href="/home">Home</a>
                            </button>
                        </div>
                    </header>
                    <PaymentForm />
                    <div className="plansContainer">
                        <div className="card_container">
                            <div className="cardBasic">
                                <div className="cover">
                                    <ul>
                                        <h1>Basic</h1>
                                        <li>3 Activities</li>
                                        <li>Promotional image</li>
                                        <li>Link to your website</li>
                                        <li>Short description</li>
                                    </ul>
                                </div>
                                <center>
                                    <h2>U$D 10</h2>
                                </center>
                            </div>
                        </div>

                        <div className="card_container">
                            <div className="cardStandard">
                                <div className="cover">
                                    <ul>
                                        <h1>Standard</h1>
                                        <li>5 Activities</li>
                                        <li>Promotional image</li>
                                        <li>Link to your website</li>
                                        <li>Short description</li>
                                        <li>Insights and statistics</li>
                                    </ul>
                                </div>
                                <center>
                                    <h2>U$D 30</h2>
                                </center>
                            </div>
                        </div>

                        <div className="card_container">
                            <div className="cardPremium">
                                <div className="cover">
                                    <ul>
                                        <h1>Premium</h1>
                                        <li>Unlimited activities</li>
                                        <li>Promotional image</li>
                                        <li>Link to your website</li>
                                        <li>Short description</li>
                                        <li>Insights and statistics</li>
                                    </ul>
                                </div>
                                <center>
                                    <h2>U$D 50</h2>
                                </center>
                            </div>
                        </div>
                        <div className="benefits">
                            <center>
                                <h1>Which plan is better for your bussines?</h1>
                                <img
                                    src={benefits}
                                    alt="Not found"
                                    height="400px"
                                />
                            </center>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <header className="header">
                        <div>
                            <img src={logo} alt="Not found" />
                        </div>
                        <div>
                            <h1>Business Plans (monthly billed)</h1>
                        </div>
                        <div>
                            <button>
                                <a href="/home">Home</a>
                            </button>
                        </div>
                    </header>

                    <div className="plansContainer">
                        <div className="card_container">
                            <div className="cardBasic">
                                <div className="cover">
                                    <ul>
                                        <h1>Basic</h1>
                                        <li>3 Activities</li>
                                        <li>Promotional image</li>
                                        <li>Link to your website</li>
                                        <li>Short description</li>
                                    </ul>
                                </div>
                                <center>
                                    <h2>U$D 10</h2>

                                    <button
                                        className="shopButton"
                                        onClick={() => handleClickLogout()}
                                    >
                                        Buy Now
                                    </button>
                                </center>
                            </div>
                        </div>

                        <div className="card_container">
                            <div className="cardStandard">
                                <div className="cover">
                                    <ul>
                                        <h1>Standard</h1>
                                        <li>5 Activities</li>
                                        <li>Promotional image</li>
                                        <li>Link to your website</li>
                                        <li>Short description</li>
                                        <li>Insights and statistics</li>
                                    </ul>
                                </div>
                                <center>
                                    <h2>U$D 30</h2>
                                    <button
                                        className="shopButton"
                                        onClick={() => handleClickLogout()}
                                    >
                                        Buy Now
                                    </button>
                                </center>
                            </div>
                        </div>

                        <div className="card_container">
                            <div className="cardPremium">
                                <div className="cover">
                                    <ul>
                                        <h1>Premium</h1>
                                        <li>Unlimited activities</li>
                                        <li>Promotional image</li>
                                        <li>Link to your website</li>
                                        <li>Short description</li>
                                        <li>Insights and statistics</li>
                                    </ul>
                                </div>
                                <center>
                                    <h2>U$D 50</h2>
                                    <button
                                        className="shopButton"
                                        onClick={() => handleClickLogout()}
                                    >
                                        Buy Now
                                    </button>
                                </center>
                            </div>
                        </div>
                    </div>

                    <div className="benefits">
                        <center>
                            <h1>What plan is better for you bussines?</h1>
                            <img
                                src={benefits}
                                alt="Not found"
                                height="400px"
                            />
                        </center>
                    </div>
                </>
            )}
            <LoginForm />
            <Footer />
        </div>
    );
}
