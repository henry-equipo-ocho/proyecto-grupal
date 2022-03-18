import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './NavBar';
import LoginForm from './LoginForm'


export default function Home() {
    const [loginForm, setLoginForm] = useState(null);

    return (
         <>
            <div>
                <NavBar
                handleLoginForm={setLoginForm}/>

            <div>
                <label>
                    Hola Viajero, ¿A donde quieres ir?
                </label>
            </div>

            </div>
            
            {loginForm &&
            <LoginForm activity={loginForm} close={() => setLoginForm(null)} />}
        </>
    );
};