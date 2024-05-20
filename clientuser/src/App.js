import React from 'react';
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react';
import './App.css';

import Homepage from './pages/Homepage.jsx';
import Loginpage from './pages/Loginpage.jsx';
import { UserProvider } from './pages/ClientUserContext.jsx';


const InitalRenderComp = () => {
  const DefaultRoute = useNavigate();

  const DirectDefaultRoute = () => {
    DefaultRoute('/UserLog')
  }

  useEffect(() => {

    DirectDefaultRoute('/UserHome');
  }, []);

  return(
    <>
    <p>initial rendering</p>
    </>
  )




}

function App() {


  return (
    <>
      
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route index path='/' element={<InitalRenderComp></InitalRenderComp>}></Route>
            <Route userlog path='/UserLog' element={<Loginpage></Loginpage>}></Route>
            <Route userhome path='/UserHome' element={<Homepage></Homepage>}></Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>

       
    </>
  );
}

export default App;
