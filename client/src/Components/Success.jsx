import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { successOrder } from './Redux/Actions/actions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../Media/Logo.png';
import Footer from './Footer';
import './Css/Success.css'
import { useAxiosPrivate } from './Auth/useAxiosPrivate';

export default function Success() {
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();

    const [searchParams] = useSearchParams();
    const paypalToken = searchParams.get('token');

    const [detail, setDetail] = useState({
        nombre: '',
        email: '',
        buydate: '',
        expira: '',
    })

    async function getPaypalOrder() {
        const paypalorder = await axiosPrivate.get(`/payment/capture?token=${paypalToken}`)
        console.log(paypalorder.data.data)
        const buydate = new Date(paypalorder.data.data.buyDate).toLocaleString();
        const expdate = new Date(paypalorder.data.data.expireDate).toLocaleString();
        setDetail({
            nombre: paypalorder.data.data.name,
            email: paypalorder.data.data.email,
            buydate: buydate,
            expira: expdate,
        })

    };
    

    useEffect(() => getPaypalOrder(), []);


    return (
        <div>
            <header className='header'>
                <div>
                    <img src={logo} alt='Not found' />
                </div>
                <div>
                    <button><a href='/dashboard'>Dashboard</a></button>
                </div>
            </header>

            <div className='detailShop'>
                <center>
                    <h1>Gracias {detail.nombre}</h1>
                    Estos son los detalles de tu compra:
                    <ul>
                        <label className='tag'>Nombre:</label><li>{detail.nombre}</li>
                        <label className='tag'>email:</label> <li> {detail.email}</li>
                        <label className='tag'>fecha de compra: </label><li>{detail.buydate}</li>
                        <label className='tag'>fecha de expiración:</label><li> {detail.expira}</li>
                    </ul>
                </center>
            </div>
            <Footer />
        </div>
    )
}
