import NavBar from './Components/NavBar';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
    <Routes>
        <Route exact path='/' element={<NavBar/>} />
  </Routes>
  </div>
  );
}

export default App;
