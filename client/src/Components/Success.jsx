import React from 'react';
import { useParams } from 'react-router-dom';
import { successOrder } from './Redux/Actions/actions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAxiosPrivate } from './Auth/useAxiosPrivate';

export default async function Success() {
    const axiosPrivate = useAxiosPrivate();
    const [searchParams] = useSearchParams();
    const paypalorder = searchParams.get('token')
    const success = await axiosPrivate.get(`http://localhost:3001/payment/capture?token=${paypalorder}`)

    const dispatch = useDispatch();
    useEffect(() => dispatch(successOrder(success)),[])

    console.log('hola que tal')
    return (

        <div>Gracias por la compra este es tu compra {success} </div>


    )
}
