import React from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../Media/Logo.png";
import { useAxiosPrivate } from "./Auth/useAxiosPrivate";
import "./Css/NavBar.css";
import { setUserName } from "./Redux/Actions/actions";
import { SET_TOKEN } from "./Redux/Actions/actions_types";

export default function NavBar({ handleLoginForm }) {
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const isLogged =
        useSelector((state) => state.token) || localStorage.getItem("loggedIn")
            ? true
            : false;
    const nombre = JSON.parse(localStorage.getItem("data"))
        ? JSON.parse(localStorage.getItem("data")).name
        : "Traveler";

    const logout = (e) => {
        e.preventDefault();
        window.localStorage.clear();
        dispatch(setUserName("Traveler"));
        axiosPrivate.get("/token/clear");
        dispatch({ type: SET_TOKEN, payload: "" });
        window.location.reload();
    };

    return (
        <header className="headerNav">
            <div>
                <img src={logo} alt="Not found" />
            </div>
            {isLogged ? (
                <>
                    <div>
                        <h1>Hi there, {nombre}!</h1>
                    </div>
                    <div className="buttonsLogin">
                        <button className="buttonNav">
                            <a href="/dashboard">Dashboard</a>
                        </button>
                        <button
                            className="buttonNav"
                            href="javascript:location.reload()"
                            onClick={(e) => logout(e)}
                        >
                            Logout
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <h1>Hi there, Traveler!</h1>
                    </div>
                    <div className="buttonsLogOut">
                        <button className="buttonNav">
                            <a href="/google-map">Maps</a>
                        </button>
                        <button className="buttonNav">
                            <a href="/plans">Plans</a>
                        </button>
                        <button className="buttonNav" onClick={handleLoginForm}>
                            LogIn
                        </button>
                        <button className="buttonNav">
                            <a href="/register">SignUp</a>
                        </button>
                    </div>
                </>
            )}
        </header>
    );
}
