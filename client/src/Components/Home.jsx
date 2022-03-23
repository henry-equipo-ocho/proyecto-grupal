import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './NavBar';
import LoginForm from './LoginForm';
import ActivityCard from './ActivityCard';
import ActivityDetail from './ActivityDetail';
import { getActivities } from './Redux/Actions/actions';

export default function Home() {
    const dispatch = useDispatch();
    const [loginForm, setLoginForm] = useState(null);
    const [detail, setDetail] = useState(null);
    const userName = useSelector(state => state.userName);
    const activities = useSelector(state => state.activities);
    useEffect(() => dispatch(getActivities()), [dispatch]);
    console.log(activities);

    return (
        <>
            <div>
                <NavBar
                    handleLoginForm={setLoginForm}
                    />

                <div>
                    <center>
                        <label style={{ fontSize: '30px'}}>
                            Hola {userName.split('@')[0]}  ¿A donde quieres ir?
                        </label>
                    </center>
                </div>

                <ActivityCard
                    handleDetail={setDetail}
                    />
            </div>

            {loginForm &&
                <LoginForm activity={loginForm} close={() => setLoginForm(null)} abierto={true} />}

            {detail &&
                <ActivityDetail activity={detail} close={() => setDetail(null)} />}
        </>
    );
};