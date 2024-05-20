import React from 'react';
import Loginprompt from '../components/LoginComponents/loginprompt';
import LoginComponents from '../components/LoginComponents/login_components';
import { BrowserRouter, Routes, Route,  Link, useHistory, useNavigate } from 'react-router-dom';

const LoginPage = () => {

    return (
        <>
          {/*master components of login page  */}
          <LoginComponents></LoginComponents>
        </>
    )

}

// const SomeComponent = () => {

  
//     const navigate = useNavigate();
  
//     return (
//       <div>
//         <h1>Some Component</h1>
//         <button className='border border-black' onClick={() => navigate('/home')}>Go to Home Page</button>
//       </div>
//     );
//   };
  



 export default  LoginPage;