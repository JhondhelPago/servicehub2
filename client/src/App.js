import React from 'react';
import './App.css';
import {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import AdminLog from './pages/AdminLog';
import { UserProvider } from './components/LoginComponents/UserContext';
import { ClientProvider } from './pages/ClientUserContext';
import UserLoginpage from './pages/UserLoginpage';
import UserHomepage from './pages/UserHomepage';



const App = () => {
  return (
    <>
      <UserProvider>
        <ClientProvider>
          <BrowserRouter>
            <Routes>
              <Route index path = '/' element = {<UserLoginpage></UserLoginpage>}></Route>
              <Route home path = '/home' element = {<UserHomepage></UserHomepage>}></Route>
              <Route UserLog path = '/AdminLogin' element = {<LoginPage></LoginPage>}></Route>
              <Route UserHome path = '/AdminHome' element = {<HomePage></HomePage>}></Route>

            </Routes>
          </BrowserRouter>
        </ClientProvider>
      </UserProvider>
    </>
  )
}

export default App;