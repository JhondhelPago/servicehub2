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

    // Array container for event_registry of this user
    const [event_registry, SetEvent_registry] = useState([]);

    //Array container for job_registry of this user
    const [job_registry, SetJob_registry] = useState([]);

    const [isNavOpen, setIsNavOpen] = useState(false);

    //fetching the Eventpost from the database
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

    //fetching the Jobpost from the database
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
        setIsNavOpen(false);

        switch (ComponentName) {
            case 'EventPosting':
                FetchEventData();
                break;
            case 'JobPosting':
                FetchJobData();
                break;

            default:

                break;
        }
    };

    //fetching the Registry
    const FetchRegistry = async () => {
        try {
            const response = await axios(`/ExtractRegistry/${clientuserId}`);
            const RegistryObj = response.data;
            const { event_registry } = RegistryObj;
            const { job_registry } = RegistryObj;
            console.log('Registry array of event');
            console.log(event_registry);
            //assign to the useState variable of event_registry
            SetEvent_registry(event_registry);
            console.log('Registry array of job');
            console.log(job_registry);
            //assign to the useState variable of job_registry
            SetJob_registry(job_registry);
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        document.title = 'Homepage';
        FetchEventData();
        FetchJobData();
        FetchRegistry();
    }, [])

    return (
        <>
            <div className='min-h-screen bg-gray-100 min-w-screen'>
                <div className="flex flex-col h-screen px-5 font-poppins text-darkColor">
                    {/* <!-- nav --> */}
                    <nav className="container sticky top-0 grid items-center grid-cols-2 py-5 mx-auto bg-gray-100 xl:flex">
                        {/* <!-- logo container --> */}
                        <button className="" onClick={() => { SetSelectedComponent('EventPosting') }}>
                            <img className="h-10 select-none" src={nav_logo} alt="logo" />
                        </button>
                        {/* <!-- menu btn --> */}
                        <button className="flex h-full ml-auto rounded xl:hidden text-primary-light focus:outline-none focus:ring-primary-light focus:ring-1" onClick={() => setIsNavOpen(!isNavOpen)}>
                            <svg className="h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M4 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 12a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m7-7a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2z" /></svg>
                        </button>
                        {/* <!-- links container --> */}
                        <div className={`col-span-2 font-medium xl:ml-auto xl:col-span-1 relative xl:flex ${isNavOpen ? '' : 'hidden'}`}>
                            <ul className="flex flex-col pt-5 mx-auto font-bold text-center gap-7 w-fit xl:pt-0 xl:flex-row xl:gap-20">
                                <button
                                    className={`font-medium relative w-fit mx-auto ${ActiveComponent === 'EventPosting' ? 'activeUserLink' : 'userNavHover'}`}
                                    onClick={() => { SetSelectedComponent('EventPosting') }}
                                >
                                    Events
                                    {/* notif badge */}
                                    {/* <span className='px-2 py-1 ml-2 text-xs text-white bg-red-600 rounded-full'>99999</span> */}
                                </button>
                                <button
                                    className={`font-medium relative w-fit mx-auto ${ActiveComponent === 'JobPosting' ? 'activeUserLink' : 'userNavHover'}`}
                                    onClick={() => { SetSelectedComponent('JobPosting') }}
                                >
                                    Find a Job
                                    {/* notif badge */}
                                    {/* <span className='px-2 py-1 ml-2 text-xs text-white bg-red-600 rounded-full'>99999</span> */}
                                </button>
                                <button
                                    className={`font-medium relative w-fit mx-auto ${ActiveComponent === 'Chat' ? 'activeUserLink' : 'userNavHover'}`}
                                    onClick={() => { SetSelectedComponent('Chat') }}
                                >
                                    Chat
                                    {/* notif badge */}
                                    {/* <span className='px-2 py-1 ml-2 text-xs text-white bg-red-600 rounded-full'>99999</span> */}
                                </button>
                                <button
                                    className={`font-medium relative w-fit mx-auto ${ActiveComponent === 'Tickets' ? 'activeUserLink' : 'userNavHover'}`}
                                    onClick={() => { SetSelectedComponent('Tickets') }}
                                >
                                    Tickets
                                    {/* notif badge */}
                                    {/* <span className='px-2 py-1 ml-2 text-xs text-white bg-red-600 rounded-full'>99999</span> */}
                                </button>
                                <button
                                    className={`font-medium relative w-fit mx-auto ${ActiveComponent === 'Profile' ? 'activeUserLink' : 'userNavHover'}`}
                                    onClick={() => { SetSelectedComponent('Profile') }}
                                >
                                    Profile
                                </button>
                                <button className='flex flex-row items-center gap-2 mx-auto font-medium rounded-full group'>
                                    {/* <span className='hidden text-red-600 group-hover:inline'>Logout</span> */}
                                    <svg className='h-5 mx-auto group-hover:text-red-600' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z" /></svg>
                                </button>
                            </ul>
                        </div>
                    </nav>

                    {/* <!-- main content container --> */}
                    <div className="container flex flex-col h-full mx-auto overflow-hidden">
                        {/* <!-- event post container --> */}
                        <div className='flex flex-col gap-5 px-2 overflow-auto'>
                            {ActiveComponent == 'EventPosting' && (
                                <div className='mx-auto text-3xl font-semibold xl:hidden font-noto'>Events</div>
                            )}
                            {ActiveComponent === 'EventPosting' && EventData.map((eventItem) => {
                                console.log(`boolean if this post id is in the array of registered ${eventItem.id} : ` + event_registry.includes(eventItem.id));
                                if (eventItem.archive_status == 'false') {
                                    return (
                                        <EventPostComponent key={eventItem.id} eventdata={eventItem} RegistredBoolean={event_registry.includes(eventItem.id)} ReInvokeFetchRegistry={FetchRegistry}></EventPostComponent>
                                    )
                                }
                            })}
                        </div>
                        <div className='flex flex-col gap-5 px-2 overflow-auto'>
                            {ActiveComponent == 'JobPosting' && (
                                <div className='mx-auto text-3xl font-semibold xl:hidden font-noto'>Find a Job</div>
                            )}
                            {ActiveComponent === 'JobPosting' && JobData.map((jobItem) => {
                                if (jobItem.archive_status == 'false') {
                                    return (
                                        <JobPostComponent key={jobItem.id} jobdata={jobItem} RegisteredBoolean={job_registry.includes(jobItem.id)} ReInvokeFetchRegistry={FetchRegistry}></JobPostComponent>
                                    )
                                }
                            })}
                        </div>
                        {/* InboxComponent */}
                        {ActiveComponent === 'Chat' && (<ChatSection></ChatSection>)}

                        <div className='flex flex-col gap-5 px-2 overflow-auto'>
                            {ActiveComponent === 'Tickets' && (<TicketPage event_registry={event_registry} job_registry={job_registry}></TicketPage>)}
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
