import React from 'react';
import './App.css';
import {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  HomePage from "./pages/Home";
import LoginPage from "./pages/Login";

import { UserProvider } from './components/LoginComponents/UserContext';

// const App = () => {

//   const [backendata, setbackendata] = useState(null);

//   useEffect(() => {

//     fetch("/api")
//     .then(response => response.json())
//     .then(data => {
//       setbackendata(data);
//     })


//   }, []);

//   return (
//     <div>
//      <h1 className='text-red-500 text-center'>Jhondhel Pago</h1>
     
//      {/* <p>{backendata.length}</p> */}
//      {/* <p>{backendata[0].userId + ',' + backendata[0].username}</p> */}

     
//     </div>
//   );
// }



const App = () => {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route index path = '/' element = {<LoginPage></LoginPage>}></Route>
            <Route home path = '/home' element = {<HomePage></HomePage>}></Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  )
}

export default App;