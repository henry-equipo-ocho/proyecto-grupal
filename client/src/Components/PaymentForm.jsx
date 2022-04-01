import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
import './Css/PaymentForm.css'

export default function PaymentForm() {
    const dispatch = useDispatch()
    const [shop, setShop] = useState({
        price: '',
        tier: '',
        description: '',
    });

    function paymentInfo(e) {
        if (e.target.value === '1') {
            setShop({
                price: 10,
                tier: 1,
                description: 'Basic Plan'
            });
        }
        if (e.target.value === '2') {
            setShop({
                price: 35,
                tier: 2,
                description: 'Standard Plan'
            });
        }
        if (e.target.value === '3') {
            setShop({
                price: 50,
                tier: 3,
                description: 'Premium Plan'
            });
        };
    }
    console.log(shop)

    async function handleSubmit(e) {
        e.preventDefault();
        if(!shop.price){
            swal('Sorry!', 'You havent chosen anything', 'info')
        }
        dispatch(await axios.post('http://localhost:3001/create', shop))
    }

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
