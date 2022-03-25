import NavBar from './Components/NavBar';
import { Route, Routes } from 'react-router-dom';
import Register from './Components/Register/Register'
import Slideshow from './Components/Landingpage/Slideshow'
import Home from './Components/Home'
import UserDashboard from './Components/UserDashboard/UserDashboard';

function App() {
  return (
    <div>
    <Routes>
        <Route exact path='/' element={<Slideshow />} />
       {/*  <Route exact path='/home' element={<NavBar />} /> */}
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/dashboard' element={<UserDashboard />} />
      </Routes>

    </div>
  );
}

export default App;
