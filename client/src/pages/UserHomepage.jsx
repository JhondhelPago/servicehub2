import React, { useContext, useEffect, useState } from 'react';
import { ClientUserContext } from './ClientUserContext.jsx';
import axios from 'axios';
import nav_logo from '../assets/nav logo dark.png';

// Import components
import EventPostComponent from '../components/HomeComponents/event_post_component.jsx';
import JobPostComponent from '../components/HomeComponents/job_post_component.jsx';
import ChatSection from '../components/HomeComponents/chat_component.jsx';
import InboxComponent from '../components/HomeComponents/inbox_component.jsx';
import ComposeComponent from '../components/HomeComponents/compose_component.jsx';
import SentComponent from '../components/HomeComponents/sent_component.jsx';
import Profilepage from '../components/HomeComponents/Profilepage.jsx';
import TicketPage from '../components/HomeComponents/ticketPage.jsx';

const UserHomepage = () => {


    const { clientuserId } = useContext(ClientUserContext);

    // Array container for the EventPost
    const [EventData, SetEventData] = useState([]);

    // Array container for JobPost
    const [JobData, SetJobData] = useState([]);

    const FetchEventData = async () => {

        try {

            // getting the data from the middle server
            const response = await axios.get('/fetchingEventPost');
            const data = response.data;

            console.log(data);
            SetEventData(data);



        } catch (error) {
            console.error(error);
        }
    };

    const FetchJobData = async () => {
        try {
            //using the axios get the data from the server
            const response = await axios.get('/fetchingJobPost');
            const data = response.data;
            console.log(data);
            SetJobData(data);
        } catch (error) {
            console.log(error);
        }
    }


    const [ActiveComponent, setActiveComponent] = useState('EventPosting');

    const SetSelectedComponent = (ComponentName) => {

        setActiveComponent(ComponentName);

    };




    useEffect(() => {
        document.title = 'Homepage'

        FetchEventData();

        FetchJobData();
        console.log(EventData);
    }, [])

    return (
        <>

            <title>Welcome to ServiceHub</title>

            <div className='min-h-screen bg-gray-100 min-w-screen'>
                <div className="flex flex-col h-screen px-5 font-poppins text-darkColor">
                    {/* <!-- nav --> */}
                    <nav className="container sticky top-0 grid items-center grid-cols-2 py-5 mx-auto bg-gray-100 lg:flex">
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
                            <ul className="grid gap-10 pt-5 mx-auto font-bold text-center w-fit lg:pt-0 lg:flex lg:gap-20 lg:w-auto">
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

                                <button
                                    className={`font-medium ${ActiveComponent === 'EventPosting' ? 'activeUserLink' : 'userNavHover'}`}
                                    onClick={() => { SetSelectedComponent('EventPosting') }}
                                >Events</button>

                                <button
                                    className={`font-medium ${ActiveComponent === 'JobPosting' ? 'activeUserLink' : 'userNavHover'}`}
                                    onClick={() => { SetSelectedComponent('JobPosting') }}
                                >Find a Job</button>

                                <button
                                    className={`font-medium ${ActiveComponent === 'Chat' ? 'activeUserLink' : 'userNavHover'}`}
                                    onClick={() => { SetSelectedComponent('Chat') }}
                                >Chat</button>

                                <button
                                    className={`font-medium ${ActiveComponent === 'Tickets' ? 'activeUserLink' : 'userNavHover'}`}
                                    onClick={() => SetSelectedComponent('Tickets')}
                                >Tickets</button>

                                <button
                                    className={`font-medium ${ActiveComponent === 'Profile' ? 'activeUserLink' : 'userNavHover'}`}
                                    onClick={() => { SetSelectedComponent('Profile') }}
                                >Profile</button>

                            </ul>
                        </div>
                    </nav>
                    {/* <!-- main content container --> */}
                    {/* <p>output {clientuserId ?  clientuserId : 'null'}</p> */}

                    <div className="container flex flex-col h-full pt-5 mx-auto overflow-hidden">
                        {/* <!-- event post container --> */}
                        <div className='flex flex-col gap-5 px-2 overflow-auto'>
                            {/* <div>
                                <h1 className="text-6xl font-semibold text-center font-noto">My Profile </h1>
                            </div> */}
                            {ActiveComponent === 'EventPosting' && EventData.map((eventItem) => {
                                return (
                                    <EventPostComponent key={eventItem.id} eventdata={eventItem}></EventPostComponent>
                                )
                            })}
                        </div>

                        <div className='flex flex-col gap-5 px-2 overflow-auto'>
                            {/* {ActiveComponent === 'EventPosting' && <EventPostComponent></EventPostComponent>} */}
                            {/* job post component */}
                            {ActiveComponent === 'JobPosting' && JobData.map((jobItem) => {
                                return (
                                    <JobPostComponent key={jobItem.id} jobdata={jobItem}></JobPostComponent>
                                )
                            })}
                        </div>

                        {/* InboxComponent */}
                        {ActiveComponent === 'Chat' && (<ChatSection></ChatSection>)}

                        <div className='flex flex-col gap-5 px-2 overflow-auto'>
                            {ActiveComponent === 'Tickets' && (<TicketPage></TicketPage>)}
                        </div>
                        {/* Profile */}
                        {ActiveComponent === 'Profile' && (<Profilepage UserId={clientuserId}></Profilepage>)}



                    </div>
                </div>
            </div>
        </>
    );
};

export default UserHomepage;
