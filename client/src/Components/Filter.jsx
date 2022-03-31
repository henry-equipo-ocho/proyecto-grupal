import React, { useState } from 'react';
import './Css/Filter.css';
import { useDispatch, useSelector } from 'react-redux';
import { orderActivitiesByPrice } from './Redux/Actions/actions';

export default function Filter({ handleChangeCurrentPage }) {
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries);
    const cities = useSelector((state) => state.cities);
    const [input, setInput] = useState({
        type: '',
        country: '',
        city: ''
    });
    const citys = cities.filter(p => p.country === input.country);

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

    function handleOrderPrice(e) {
        setInput({
            ...input,
            type: e.target.value
        });
    };

    function handlseSumbit() {
        dispatch(orderActivitiesByPrice(input));
        handleChangeCurrentPage(1);
    };

    return (
        <div className='filterContainer'>
                    <div>
                        <label>Select Country </label> {'\n'}
                        <select onChange={(e) => handleCountries(e)}>
                            <option value=''></option>
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
                            <option value=''></option>
                            {citys?.map((c) => (
                                <option
                                    value={c.name} key={c._id}
                                >{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Price</label>
                        <select onChange={e => handleOrderPrice(e)}>
                            <option value='Nada'></option>
                            <option value='Ascendent'>Lowest price first</option>
                            <option value='Descendent'>Highest price first</option>
                        </select>
                    </div>
                    <button
                    type='Submit'
                    className='filterButton'
                    onClick={(e) => handlseSumbit(e)}>Filter</button>
        </div >
    );
};