import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './NavBar';
import LoginForm from './LoginForm';
import ActivityCard from './ActivityCard';
import ActivityDetail from './ActivityDetail';
import { getActivities } from './Redux/Actions/actions';
import './Css/ActivityCard.css'

export default function Home() {
    const dispatch = useDispatch();
    const [loginForm, setLoginForm] = useState(null);
    const [detail, setDetail] = useState(null);
    const userName = useSelector(state => state.userName);
    const activities = useSelector(state => state.activities);
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
                    {activities.data?.map((a) => (
                        <ActivityCard
                            handleDetail={() => setDetail(a)}
                            nombre={a.name}
                            imagen={a.picture}
                            key={a.ID}
                        />
                    ))}
                </div>

            </div>

            {loginForm &&
                <LoginForm activity={loginForm} close={() => setLoginForm(null)} abierto={true} />}

            {detail &&
                <ActivityDetail activity={detail} close={() => setDetail(null)} />}
        </>
    );
};