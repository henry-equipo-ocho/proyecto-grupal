import React from 'react';
import travel from '../Media/travel.m4v';
import './Css/LandingPage.css';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className='containerLanding' data-testid='title'>
            <video className='video' src={travel} autoPlay loop muted />
            <div className='textContainer'>
                <center>
                    <h1>¿Vamos a conocer Latinoamerica?</h1>
                </center>
                <p className="parrafo">
                    Conoce las principales ciudades de Latinoamerica
                    creando un intinerario personalizado, donde podras {"\n"}
                    agregar y quitar actividades a tu gusto, asi tu viaje
                    sera unico e inolvidable.
                </p>
                <center>
                    <Link to={'/home'}>
                        <button className='landingButton'>Ingresar</button>
                    </Link>
                </center>
            </div>
        </div>
    )
}