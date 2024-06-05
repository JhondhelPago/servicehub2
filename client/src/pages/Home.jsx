import React from 'react';
import Homeprompt from '../components/AdminComponents/dashboard';
import HomeComponent from '../components/AdminComponents/home_component';
import { useContext } from 'react';
import { UserContext } from '../components/LoginComponents/UserContext';
const HomePage = () => {

    const { AdminId } = useContext(UserContext);

    return (
        <>
            <div>
                <HomeComponent></HomeComponent>
            </div>
        </>
    )

}


export default HomePage