import React from 'react';
import './Css/Pagination.css'

export default function Pagination({ activitiesPerPage, allActivities, paginado, handlePage, currentPage }) {
    const pageNumber = [];

    for (let i = 1 ; i <= Math.ceil((allActivities) / activitiesPerPage); i++) {
        pageNumber.push(i);
    };

    return (
        <nav>
            <div className='paginado'>
                <button className='buttonPag' onClick={() => handlePage(currentPage - 1)}>Prev</button>
                {pageNumber?.map(number => (
                    <button
                        className='but'
                        onClick={() => paginado(number)}
                        key={number}
                    >
                        {number}
                    </button>
                ))}
                <button className='buttonPag' onClick={() => handlePage(currentPage + 1)}>Next</button>
            </div>
        </nav>
    )
}