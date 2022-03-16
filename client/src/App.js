import { Routes, Route } from 'react-router-dom';

import Register from './Components/Register/Register'

function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/register' element={ <Register/>  } />
      </Routes>
    </div>
  );
}

export default App;
