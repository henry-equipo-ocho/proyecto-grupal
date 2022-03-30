import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { orderActivities } from './Redux/Actions/actions';


export default function Filter({ handleChangeCurrentPage}) {
    const dispatch = useDispatch();
    const activities = useSelector((state) => state.activities);

    function handleOrderName(e) {
        const value = {
            type: e.target.value,
            country: 'Colombia'
        }
        dispatch(orderActivities(value));
        handleChangeCurrentPage(1);
    };

    return (
        <div>
            <label>Filtar por ciudad</label>
                <select onChange={e => handleOrderName(e)}>
                    <option value='Nada'>Orden Alfabetico</option>
                    <option value='A-Z'>A-Z</option>
                    <option value='Z-A'>Z-A</option>
                </select>


                <label>Ordenar por precio </label>
    
                    <input type='range' />

               







        </div>



    );
};