import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import logo from '../Media/Logo.png';
import './Css/BussinesPackage.css';
import Footer from './Footer';
import PaymentForm from './PaymentForm';

export default function BussinesPackage() {
    const isLogged = useSelector(state => state.token) ? true : false || localStorage.getItem('loggedIn') ? true : false;

    function handleClickLogout() {
        swal('Sorry!', 'Please login to continue', 'info');
    };
    return (
        <div className='pageB'>
            <header className='header'>
                <div>
                    <img src={logo} alt='Not found' />
                </div>
                <div>
                    <button><a href='/home'>HOME</a></button>
                </div>
            </header>

            {isLogged ?
                <>

                    <PaymentForm />
                    <div className='plansContainer'>
                        <div className='card_container'>
                            <div className='cardBasic'>
                                <div className='cover'>
                                    <ul>
                                        <h1>Basic</h1>
                                        <li>3 Activities</li>
                                        <li>Imagen promocional</li>
                                        <li>Link directo</li>
                                    </ul>
                                </div>
                                <center>
                                    <h2>$10 US</h2>
                                </center>
                            </div>
                        </div>


                        <div className='card_container'>
                            <div className='cardStandard'>
                                <div className='cover'>
                                    <ul>
                                        <h1>Standard</h1>
                                        <li>5 Activities</li>
                                        <li>Imagen promocional</li>
                                        <li>Link directo</li>
                                        <li>Descripción corta</li>
                                        <li>Informe de estadisticas</li>
                                    </ul>
                                </div>
                                <center>
                                    <h2>$30 US</h2>
                                </center>
                            </div>
                        </div>

                        <div className='card_container'>
                            <div className='cardPremium'>
                                <div className='cover'>
                                    <ul>
                                        <h1>Premium</h1>
                                        <li>Sin limite de actividades</li>
                                        <li>Imagen promocional</li>
                                        <li>Link directo</li>
                                        <li>Descripción corta</li>
                                        <li>Informe de estadisticas</li>
                                        <li>Pin en google maps</li>
                                    </ul>
                                </div>
                                <center>
                                    <h2>$50 US</h2>
                                </center>

                            </div>
                        </div>
                    </div>
                </>
                :
                <>
                    <div className='plansContainer'>
                        <div className='card_container'>
                            <div className='cardBasic'>
                                <div className='cover'>
                                    <ul>
                                        <h1>Basic</h1>
                                        <li>3 Activities</li>
                                        <li>Imagen promocional</li>
                                        <li>Link directo</li>
                                    </ul>
                                </div>
                                <center>
                                    <h2>$10 US</h2>
                                </center>
                                <button
                                    className='shopButton'
                                    onClick={() => handleClickLogout()}>Buy Now</button>
                            </div>
                        </div>


                        <div className='card_container'>
                            <div className='cardStandard'>
                                <div className='cover'>
                                    <ul>
                                        <h1>Standard</h1>
                                        <li>5 Activities</li>
                                        <li>Imagen promocional</li>
                                        <li>Link directo</li>
                                        <li>Descripción corta</li>
                                        <li>Informe de estadisticas</li>
                                    </ul>
                                </div>
                                <center>
                                    <h2>$30 US</h2>
                                </center>
                                <button
                                    className='shopButton'
                                    onClick={() => handleClickLogout()}>Buy Now</button>
                            </div>
                        </div>

                        <div className='card_container'>
                            <div className='cardPremium'>
                                <div className='cover'>
                                    <ul>
                                        <h1>Premium</h1>
                                        <li>Sin limite de actividades</li>
                                        <li>Imagen promocional</li>
                                        <li>Link directo</li>
                                        <li>Descripción corta</li>
                                        <li>Informe de estadisticas</li>
                                        <li>Pin en google maps</li>
                                    </ul>
                                </div>
                                <center>
                                    <h2>$50 US</h2>
                                </center>
                                <button
                                    className='shopButton'
                                    onClick={() => handleClickLogout()}>Buy Now</button>
                            </div>
                        </div>
                    </div>
                </>}
            <Footer />
        </div>
    );
}