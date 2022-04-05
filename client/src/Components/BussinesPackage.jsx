import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import logo from '../Media/Logo.png';
import './Css/BussinesPackage.css';
import NavBar from './NavBar';
import Footer from './Footer';
import PaymentForm from './PaymentForm';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';

export default function BussinesPackage() {
    const isLogged = useSelector(state => state.token) ? true : false || localStorage.getItem('loggedIn') ? true : false;
    const navigate = useNavigate();
   

    function handleClickLogout() {
        Swal.fire({
            title: 'Sorry!',
            text:'Please Login to continue',
            icon:'info',
            color: 'white',
            background:'#00498b',
            confirmButtonText: '<a href="/home">Logueame</a>',
            confirmButtonColor: '#24c59c'
          });          
    };

    return (
        <div className='pageB'>
            <header className='header'>
                <div>
                    <img src={logo} alt='Not found' />
                </div>
                <div>
                    <h1>Planes para empresas</h1>
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

                <LoginForm/>
            <Footer />
        </div>
    );
}