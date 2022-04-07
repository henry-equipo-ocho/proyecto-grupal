import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import BusinessDashboard from './Components/BusinessDashboard/BusinessDashboard';
import BussinesPackage from './Components/BussinesPackage';
import RenderMap from './Components/GoogleMap/RenderMap/RenderMap';
import Home from './Components/Home';
import LandingPage from './Components/LandingPage';
import Register from './Components/Register/Register';
import Success from './Components/Success';
import UserDashboard from './Components/UserDashboard/UserDashboard';
import SocialLogin from './Components/SocialLogin';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';

function App() {

    return (
        <div>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                {/* <Route exact path='/' element={<NavBar />} /> */}
                <Route exact path='/home' element={<Home />} />
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/dashboard' element={<UserDashboard />} />
                <Route exact path='/admin' element={<AdminDashboard />} />
                <Route path='/google-map' element={<RenderMap />} />
                <Route exact path='/plans' element={<BussinesPackage />} />
                <Route path='/success' element={<Success />} />
                <Route exact path='/mybusiness' element={<BusinessDashboard />} />
                <Route exact path='/social-login' element={<SocialLogin />} />
                <Route exact path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/reset-password' element={<ResetPassword />} />
            </Routes>

        </div>
    );
}

export default App;
