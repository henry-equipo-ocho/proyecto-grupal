import React from 'react';
import travel from '../Media/travel.m4v';
import './Css/LandingPage.css';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className='containerLanding' data-testid='title'>
            <video className='video' src={travel} autoPlay loop muted />
            <div className='textContainer'>
                <h1>¿Vamos a conocer Latinoamerica?</h1>
                    <p>
                        Conoce las principales ciudades de Latinoamerica
                        creando un intinerario personalizado, donde podras
                        agregar y quitar actividades a tu gusto, asi tu viaje
                        sera unico e inolvodable.
                    </p>
                <Link to={'/home'}>
                    <button className='landingButton'>Ingresar</button>
                </Link>

            </div>

        </div>
    )
}