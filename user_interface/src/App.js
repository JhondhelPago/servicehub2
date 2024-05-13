import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Loginpage from './pages/Loginpage.jsx';
import Homepage from './pages/Homepage.jsx';



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Loginpage></Loginpage>}></Route>
          <Route home path='/home' element={<Homepage></Homepage>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
