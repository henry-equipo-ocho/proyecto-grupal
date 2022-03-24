import React from 'react'

export default function Pagination({ activitiesPerPage, allActivities, paginado }) {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil((allActivities + 1) / activitiesPerPage)  ; i++) {
        pageNumber.push(i)
    };

    return (
        <nav>
            <div className='paginado'>
                {pageNumber?.map(number => (
                    <button
                        className='but'
                        onClick={() => paginado(number)}
                        key={number}
                    >
                        {number}
                    </button>
                ))}
            </div>
        </nav>
    )
}