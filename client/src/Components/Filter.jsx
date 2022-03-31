import React, { useState } from 'react';
import './Css/Filter.css'
import { useDispatch, useSelector } from 'react-redux';
import { orderActivitiesByCity, orderActivitiesByPrice } from './Redux/Actions/actions';

export default function Filter({ handleChangeCurrentPage }) {
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries);
    const cities = useSelector((state) => state.cities)
    const [input, setInput] = useState({
        type: '',
        country: '',
        city: ''
    });

    const prueba = cities.filter(p => p.country === input.country)
    console.log(prueba)

    function handleCountries(e) {
        setInput({
            ...input,
            country: e.target.value
        });
    };

    function handleCities(e) {
        setInput({
            ...input,
            city: e.target.value
        });
    };

    function handleOrderName(e) {
        setInput({
            ...input,
            type: e.target.value
        });
        console.log(input)
    };

    function handleOrderPrice(e) {
        setInput({
            ...input,
            type: e.target.value
        });
    };

    function handlseSumbit() {
        dispatch(orderActivitiesByPrice(input));
        //dispatch(orderActivitiesByCity(input));
        handleChangeCurrentPage(1);
    };

    return (
        <div className='formContainer'>
            <div>
                <form className='form1'>
                    <label>Order</label>
                    <div>
                        <label>Order by name</label>
                        <select onChange={e => handleOrderName(e)}>
                            <option value='Nada'>---</option>
                            <option value='A-Z'>A-Z</option>
                            <option value='Z-A'>Z-A</option>
                        </select>
                    </div>

                    <div>
                        <label>Order by price</label>
                        <select onChange={e => handleOrderPrice(e)}>
                            <option value='Nada'>---</option>
                            <option value='Ascendent'>Lowest Price</option>
                            <option value='Descendent'>Highest Price</option>
                        </select>
                    </div>

                    <div>
                        <label>Order by countries </label>
                        <select onChange={(e) => handleCountries(e)}>
                            <option value=''>---</option>
                            {countries?.map((c) => (
                                <option
                                    value={c.name} key={c._id}
                                >{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <button type='Submit' onClick={(e) => handlseSumbit(e)}>Order</button>

                </form>
            </div>

            <div>
                <form className='form2'>
                    <label>Filter</label>
                    <div>
                        <label>Select Country </label>
                        <select onChange={(e) => handleCountries(e)}>
                            <option value=''>---</option>
                            {countries?.map((c) => (
                                <option
                                    value={c.name} key={c._id}
                                >{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Select City </label>
                        <select onChange={(e) => handleCities(e)}>
                            <option value=''>---</option>
                            {prueba?.map((c) => (
                                <option
                                    value={c.name} key={c._id}
                                >{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>type</label>
                        <select onChange={e => handleOrderPrice(e)}>
                            <option value='Nada'>---</option>
                            <option value='Ascendent'>Lowest Price</option>
                            <option value='Descendent'>Highest Price</option>
                        </select>
                    </div>
                    <button type='Submit' onClick={(e) => handlseSumbit(e)}>Filter</button>
                </form>
            </div >
        </div >
    );
};