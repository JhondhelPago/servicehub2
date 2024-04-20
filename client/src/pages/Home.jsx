import React from 'react';
import Homeprompt from '../components/HomeComponents/homeprompt';
import HomeComponent from '../components/HomeComponents/home_component';
import { useContext } from 'react';
import { UserContext } from '../components/LoginComponents/UserContext';
const HomePage = () => {

    const {AdminId} = useContext(UserContext);
    
    return (
        <>
            <div>
                
                <HomeComponent></HomeComponent>
                <h1>{AdminId}</h1>
            </div>
        </>
    )

}


export default HomePage