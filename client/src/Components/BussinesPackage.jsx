import React from 'react';
import './Css/BussinesPackage.css'

export default function BussinesPackage() {
    return (
        <div >
            <button href='/home' >Volver a home</button>
            <div className='plansContainer'>
                <div className='card_container'>
                    <div className='card'>
                        <div className='cover'>
                            <p> 
                            </p>
                        </div>

                        <div className='description'>
                            <h2>Basic Plan</h2>
                            <h3></h3>
                            <button
                                className='boton'

                            >
                                Shop Now
                            </button>
                        </div>
                    </div>
                </div>

                <div className='card_container'>
                    <div className='card'>
                        <div className='cover'>
               
                            <h1 className='bandera'>Standard</h1>
                            <p> Basic
                                
                                Plan mas economico
                                -Hasta 3 actividades
                                -Imagen ilustrativa
                                -Link directo
                            </p>
                        </div>

                        <div className='description'>
                            <h2>Standar Plan</h2>
                            <h3></h3>
                            <button
                                className='boton'>
                                Shop Now
                            </button>
                        </div>
                    </div>
                </div>

                <div className='card_container'>
                    <div className='card'>
                        <div className='cover'>

                            <h1 className='bandera'>Premium</h1>
                        </div>

                        <div className='description'>
                            <h2>Premium Plan</h2>
                            <h3></h3>
                            <button
                                className='boton'

                            >
                                Shop Now
                            </button>
                        </div>
                    </div>
                </div>


            </div>



        </div>

    );
}