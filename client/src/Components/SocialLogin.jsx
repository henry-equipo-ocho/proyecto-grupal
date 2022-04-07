import React, { useEffect } from "react";
import { useAxiosPrivate } from "./Auth/useAxiosPrivate";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setToken, setUserName } from "./Redux/Actions/actions";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export default function SocialLogin() {
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const history = useNavigate();

    useEffect(() => handleLogin(), []);

    async function handleLogin() {
        try {
            const token = await axiosPrivate.get('/token/');
            console.log(token)
            const decoded = jwt_decode(token.data.data);
            dispatch(setToken(token.data.data));
            const storage = window.localStorage;
            storage.setItem("data", JSON.stringify(decoded));
            storage.setItem("loggedIn", "true");
            dispatch(setUserName(decoded.email));
            const nombre = JSON.parse(localStorage.getItem("data")).name;
            Swal.fire({
                title: `${nombre}`,
                text: "Bienvenido a Eztinerary",
                icon: "success",
                color: "white",
                background: "#00498b",
                confirmButtonColor: "#24c59c",
            });
            history("/dashboard");
        } catch(e) {
            console.log(e);
            Swal.fire({
                title: `Oops...`,
                text: "Something went wrong",
                icon: "error",
                color: "white",
                background: "#00498b",
                confirmButtonColor: "#24c59c",
            });
            history("/home");
        }
        
    }

    return (
    <>
    
    </>
    )
}