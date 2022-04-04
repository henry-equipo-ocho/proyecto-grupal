import React from 'react';
import { useParams } from 'react-router-dom';
import { successOrder } from './Redux/Actions/actions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../Media/Logo.png';
import Footer from './Footer';
import { useAxiosPrivate } from './Auth/useAxiosPrivate';

export default function Success() {
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const detail = useSelector(state => state.payment)
    console.log(detail)
    const [searchParams] = useSearchParams();
    const paypalToken = searchParams.get('token');

    async function getPaypalOrder() {
        const paypalorder = await axiosPrivate.get(`/payment/capture?token=${paypalToken}`)
        return paypalorder;
    };

    useEffect(() => getPaypalOrder(), []);


    return (
        <div>
            <header className='header'>
                <div>
                    <img src={logo} alt='Not found' />
                </div>
                <div>
                    <button><a href='/home'>HOME</a></button>
                </div>
            </header>


            <div>
                <h1>Gracias por la compra tu compra {paypalToken} </h1>
            </div>

            <Footer />
        </div>
    )
}
