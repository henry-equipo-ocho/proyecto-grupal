import NavBar from './Components/NavBar';
import { Route, Routes } from 'react-router-dom';
import Register from './Components/Register/Register'
import Home from './Components/Home'
import UserDashboard from './Components/UserDashboard/UserDashboard';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import LandingPage from './Components/LandingPage';
import BussinesPackage from './Components/BussinesPackage';
import Success from './Components/Success';

function App() {
  return (
    <div>
    <Routes>
        <Route exact path='/' element={<LandingPage />} />
       {/*  <Route exact path='/home' element={<NavBar />} /> */}
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/dashboard' element={<UserDashboard />} />
        <Route exact path='/admin' element={<AdminDashboard />} />
        <Route exact path='/plans' element={<BussinesPackage />}/>
        <Route path='/success' element={<Success />}/>
      </Routes>

    </div>
  );
}

export default App;
