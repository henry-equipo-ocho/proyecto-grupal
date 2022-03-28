import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './NavBar';
import LoginForm from './LoginForm';
import ActivityCard from './ActivityCard';
import ActivityDetail from './ActivityDetail';
import Pagination from './Pagination';
import { getActivities } from './Redux/Actions/actions';
import './Css/ActivityCard.css';

export default function Home() {
    const dispatch = useDispatch();
    const [loginForm, setLoginForm] = useState(null);
    const [detail, setDetail] = useState(null);
    const userName = useSelector(state => state.userName);
    const activities = useSelector(state => state.allActivities);
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfFirstActivity = (currentPage - 1) * 10;
    const currentActivities = activities.slice(
        (indexOfFirstActivity), indexOfFirstActivity + 10
    );

    useEffect(() => dispatch(getActivities()), [dispatch]);

    return (
        <>
            <div>
                <NavBar
                    handleLoginForm={setLoginForm}
                />

                <div className='userName'>
                    <label style={{ fontSize: '30px' }}>
                        Hola {userName.split('@')[0]}  ¿A donde quieres ir?
                    </label>
                </div>
                <div className='cardsContainer'>
                    {currentActivities ? currentActivities.map((a) => (
                        <ActivityCard
                            handleDetail={() => setDetail(a)}
                            nombre={a.name}
                            imagen={a.picture}
                            id={a._id}
                            key={a._id}
                        />
                    )) : <p className='loader'> </p>}
                </div>

                <Pagination
                    activitiesPerPage={10}
                    allActivities={activities.length}
                    currentPage={currentPage}
                    handlePage={setCurrentPage}
                    paginado={(pageNumber) => setCurrentPage(pageNumber)}
                />
            </div>

            {loginForm &&
                <LoginForm activity={loginForm} close={() => setLoginForm(null)} abierto={true} />}

            {detail &&
                <ActivityDetail activity={detail} close={() => setDetail(null)} />}
        </>
    );
};