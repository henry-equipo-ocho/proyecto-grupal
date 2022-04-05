import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
import './Css/PaymentForm.css'
import Swal from 'sweetalert2'
import { paymentOrder } from './Redux/Actions/actions.js'
import { useAxiosPrivate } from './Auth/useAxiosPrivate';



export default function PaymentForm() {
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch()
    const [cart, setCart] = useState({
        price: '',
        tier: '',
        description: '',
    });

    function paymentInfo(e) {
        if (e.target.value === '1') {
            setCart({
                price: 10,
                tier: 1,
                description: 'Basic Plan'
            });
        }
        if (e.target.value === '2') {
            setCart({
                price: 35,
                tier: 2,
                description: 'Standard Plan'
            });
        }
        if (e.target.value === '3') {
            setCart({
                price: 50,
                tier: 3,
                description: 'Premium Plan'
            });
        };
    }
    console.log(cart)

    async function handleSubmit(e) {
        e.preventDefault();
        if(!cart.price){
            Swal.fire({
                title: 'Sorry!',
                text:'You havent chosen anything',
                icon:'info',
                color: 'white',
                background:'#00498b',
                confirmButtonColor: '#24c59c'
                })
        };
        try {
            const payment = await axiosPrivate.post('/payment/create', { 
                cart: cart
            });
            console.log(payment)
            dispatch(paymentOrder(payment));
        } catch (e) {
            console.log(e)
        }
    };

    return (

        <div className='formPaymentContainer'>
            <form className='form' onSubmit={(e) => handleSubmit(e)}>
                <label>Select plan </label>
                <select onChange={(e) => paymentInfo(e)}>
                    <option value=''>--</option>
                    <option value='1'>Plan Basic</option>
                    <option value='2'>Plan Standar</option>
                    <option value='3'>Plan Premium</option>
                </select>
                <button
                    type='Submit'
                    className='buyBtn'
                >Buy</button>
            </form>
        </div>

    )
}
