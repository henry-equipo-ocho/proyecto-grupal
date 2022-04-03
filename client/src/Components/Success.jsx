import React from 'react';
import { useParams } from 'react-router-dom';
import { successOrder } from './Redux/Actions/actions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Success() {
    const detail = useSelector(state => state.payment)
    console.log(detail)
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    useEffect(() => dispatch(successOrder(searchParams.get('token'))),[])

    console.log('hola que tal')
    return (

        <div>Gracias por la compra este es tu compra {detail.tier} </div>


    )
}
