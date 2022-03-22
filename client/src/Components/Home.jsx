import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './NavBar';
import LoginForm from './LoginForm'
import ActivityCard from './ActivityCard';
import ActivityDetail from './ActivityDetail';


export default function Home() {
    const [loginForm, setLoginForm] = useState(null);

    const [detail, setDetail] = useState(null);

   
    const userName = useSelector(state => state.userName)


    return (
         <>
            <div>
                <NavBar />
               

            <div>
                <label>
                    Hola {userName.split('@')[0]}  ¿A donde quieres ir?
                </label>
            </div>
            <ActivityCard
            handleDetail={setDetail}/>

            </div>
            {loginForm &&

            <LoginForm activity={loginForm}  abierto={true} />}

            {detail &&
            <ActivityDetail activity={detail} close={() => setDetail(null)} />}

           
        </>
    );
};