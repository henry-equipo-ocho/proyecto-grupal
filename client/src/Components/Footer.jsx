import React from "react";
import Logo from "../Media/Logo.png";
import paypal from "../Media/paypal.png";
import "./Css/Footer.css";

export default function Footer() {
    return (
        <footer>
            <div className="footerContainer">
                <div className="div1">
                    <h3>Payment methods</h3>
                    <a
                        href="https://www.paypal.com"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src={paypal} alt="Not found" />
                    </a>
                </div>

                <div className="div2">
                    <h3>Reach us!</h3>
                    <ul>
                        <li>info@ezintinerary.com</li>
                        <li>+000 111-222-333</li>
                        <li></li>
                    </ul>
                </div>

                <div className="div3">
                    <img src={Logo} alt="not found" />
                    <h3>Around LatinAmerica</h3>
                </div>
            </div>
        </footer>
    );
}
