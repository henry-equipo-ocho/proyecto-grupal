import NavBar from './Components/NavBar';
import { Route, Routes } from 'react-router-dom';
import Register from './Components/Register/Register'
import Slideshow from './Components/Landingpage/Slideshow'
import Home from './Components/Home'
import LandingPage from './Components/LandingPage';

function App() {
  return (
    <div>
    <Routes>
        <Route exact path='/' element={<LandingPage />} />
       {/*  <Route exact path='/home' element={<NavBar />} /> */}
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/register' element={<Register />} />
      </Routes>

    </div>
  );
}

export default App;
