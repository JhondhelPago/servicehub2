import React, { useContext , useEffect, useState } from 'react';
import { ClientUserContext } from './ClientUserContext.jsx';

import nav_logo from '../assets/nav logo dark.png';

import EventPostComponent from '../components/event_post_component.jsx';
import JobPostComponent from '../components/job_post_component.jsx';
import InboxComponent from '../components/inbox_component.jsx';
import ComposeComponent from '../components/compose_component.jsx';
import SentComponent from '../components/sent_component.jsx';

const Homepage = () => {

    const { clientuserId } = useContext(ClientUserContext);

    const [EventData, SetEventData] = useState([]);

    const FetchEventData = () => {
        
        try{

            // getting the data from the middle server
            
            

        }catch(error){
            console.error(error);
        }
    }

    const [ActiveComponent, setActiveComponent] = useState('EventPosting');

    const SetSelectedComponent = (ComponentName) => {

        setActiveComponent(ComponentName);

    };




    useEffect(() => {
        document.title = 'Homepage'
    }, [])

    return (
        <>
            
            <title>Welcome to ServiceHub</title>
        
            <div className='min-h-screen bg-gray-100 min-w-screen'>
                <div className="flex flex-col font-poppins text-darkColor">
                    {/* <!-- nav --> */}
                    <nav className="container sticky top-0 grid items-center grid-cols-2 p-5 mx-auto bg-gray-100 lg:flex">
                        {/* <!-- logo container --> */}
                        <div className="">
                            <img className="h-10 select-none" src={nav_logo} alt="logo" />
                        </div>
                        {/* <!-- menu btn --> */}
                        <button className="flex h-full ml-auto rounded lg:hidden text-primary-light focus:outline-none focus:ring-primary-light focus:ring-1" id="navBtn" >
                            <svg className="h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M4 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 12a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m7-7a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2z" /></svg>
                        </button>
                        {/* <!-- links container --> */}
                        <div className="hidden col-span-2 font-medium lg:ml-auto lg:col-span-1 lg:flex" id="navLinksContainer">
                            <ul className="grid gap-10 pt-5 mx-auto text-center w-fit lg:pt-0 lg:flex lg:gap-20 lg:w-auto font-bold">
                                {/* <li className="activeUserLink">
                                    <a href="">Events</a>
                                </li>
                                <li className="userNavHover">
                                    <a href="">Find a Job</a>
                                </li>
                                <li className="userNavHover">
                                    <a href="">Chat</a>
                                </li>
                                <li className="userNavHover">
                                    <a href="">Profile</a>
                                </li> */}

                                <button onClick={() => {SetSelectedComponent('EventPosting')}}>Events</button>
                                <button onClick={() => {SetSelectedComponent('JobPosting')}}>Find a Job</button>
                                <button onClick={() => {SetSelectedComponent('Inbox')}}>Chat</button>
                                <button>Profile</button>
                            </ul>
                        </div>
                    </nav>
                    {/* <!-- main content container --> */}
                    <p>output {clientuserId ?  clientuserId : 'null'}</p>

                    <div className="container flex flex-col justify-center gap-5 p-5 mx-auto">
                        {/* <!-- event post container --> */}
                        {ActiveComponent === 'EventPosting' && (<EventPostComponent></EventPostComponent>)}
                        {/* job post component */}
                        {ActiveComponent === 'JobPosting' && (<JobPostComponent></JobPostComponent>)}
                        {/* InboxComponent */}
                        {ActiveComponent === 'Inbox' && (<InboxComponent></InboxComponent>)}
                        


                    </div>
                </div>
            </div>

        </>
    )
}


export default Homepage;