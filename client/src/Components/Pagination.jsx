import ReactPaginate from 'react-paginate';
import React from 'react';
import './Css/Pagination.css'

export default function Pagination({ activitiesPerPage, allActivities, paginado }) {
    const pagecount = Math.ceil((allActivities) / activitiesPerPage);

    function changePage({ selected }) {
        paginado(selected + 1)
    };

    return (
        <nav>
            <div className='paginado'>
                <ReactPaginate
                    containerClassName='paginado'
                    pageClassName='but'
                    previousClassName='buttonPag'
                    nextClassName='buttonPag'
                    breakClassName='but'
                    previousLabel={'prev'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    pageCount={pagecount}
                    marginPagesDisplayed={5}
                    pageRangeDisplayed={5}
                    onPageChange={changePage}
                    activeClassName='focus'
                />
            </div>
        </nav>
    )
}