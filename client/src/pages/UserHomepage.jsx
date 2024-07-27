import React, { useContext, useEffect, useState } from 'react';
import { ClientUserContext } from './ClientUserContext.jsx';
import axios from 'axios';
import nav_logo from '../assets/nav logo dark.png';
import { HotPostChecker, TimeUtils } from '../utils.js';
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

    //time reference from the hotpost/ current time now -> event
    const [TimeNow_Event, SetTimeNow_Event] = useState(null);

    //time reference from the hotpost/ current time now -> job
    const [TimeNow_Job, SetTimeNow_Job] = useState(null);

    const [EventHot, SetEventHot] = useState(0);

    const [JobHot, SetJobHot] = useState(0);



    //fetching the Eventpost from the database
    const FetchEventData = async () => {
        try {
            // getting the data from the middle server
            const response = await axios.get(`/fetchingEventPost/${clientuserId}`);
            const data = response.data;

            const Time_Now = TimeUtils.TimeNow_24HR_format();

            SetEventData(data);
            //updating the time reference
            SetTimeNow_Event(Time_Now);


            //initializing to 0 count of EventHot
            let HotEvent = 0;

            data.map((eventdata) => {

                (HotPostChecker(`${eventdata.date_created} ${eventdata.time_created}`, `${Time_Now.DateNow} ${Time_Now.TimeNowFormatted}`)) && HotEvent++;

            });

            SetEventHot(HotEvent);

        } catch (error) {
            console.error(error);
        }
    };

    //fetching the Jobpost from the database
    const FetchJobData = async () => {
        try {
            //using the axios get the data from the server
            const response = await axios.get(`/fetchingJobPost/${clientuserId}`);
            const data = response.data;

            const Time_Now = TimeUtils.TimeNow_24HR_format();

            SetJobData(data);
            //updating the time reference
            SetTimeNow_Job(Time_Now);

            let HotJob = 0;

            data.map((jobdata) => {
                (HotPostChecker(`${jobdata.date_created} ${jobdata.time_created}`, `${Time_Now.DateNow} ${Time_Now.TimeNowFormatted}`)) && HotJob++;
            });

            SetJobHot(HotJob);

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
                    <nav className="container sticky top-0 grid items-center grid-cols-2 mx-auto bg-opacity-5 xl:flex">
                        {/* <!-- logo container --> */}
                        <button className="" onClick={() => { SetSelectedComponent('EventPosting') }}>
                            <img className="h-10 select-none xl:my-5" src={nav_logo} alt="logo" />
                        </button>
                        {/* <!-- menu btn --> */}
                        <button className="flex h-10 my-5 ml-auto rounded xl:hidden text-primary-light focus:outline-none focus:ring-primary-light focus:ring-1" onClick={() => setIsNavOpen(!isNavOpen)}>
                            <svg className="h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M4 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 12a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m7-7a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2z" /></svg>
                        </button>
                        {/* <!-- links container --> */}
                        <div className={`col-span-2 font-medium xl:ml-auto xl:col-span-1 relative xl:flex ${isNavOpen ? 'shadow-lg p-5 rounded-lg bg-gray-50' : 'hidden'}`}>
                            <ul className="flex flex-col mx-auto font-bold text-center gap-7 w-fit xl:flex-row xl:gap-20">
                                <button
                                    className={`font-medium relative w-fit mx-auto ${ActiveComponent === 'EventPosting' ? 'activeUserLink' : 'userNavHover'}`}
                                    onClick={() => { SetSelectedComponent('EventPosting') }}
                                >
                                    Events
                                    {/* notif badge */}
                                    {/* <span className='px-2 py-1 ml-2 text-xs text-white bg-red-600 rounded-full'>{EventHot}</span> */}
                                    {EventHot > 0 && ( <span className='px-2 py-1 ml-2 text-xs text-white bg-red-600 rounded-full'>{EventHot}</span>)}
                                </button>
                                <button
                                    className={`font-medium relative w-fit mx-auto ${ActiveComponent === 'JobPosting' ? 'activeUserLink' : 'userNavHover'}`}
                                    onClick={() => { SetSelectedComponent('JobPosting') }}
                                >
                                    Find a Job
                                    {/* notif badge */}
                                    {/* <span className='px-2 py-1 ml-2 text-xs text-white bg-red-600 rounded-full'>{JobHot}</span> */}
                                    {JobHot > 0 && (<span className='px-2 py-1 ml-2 text-xs text-white bg-red-600 rounded-full'>{JobHot}</span>)}
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
                                <div className='mx-auto mt-2 text-3xl font-semibold xl:hidden font-noto'>Events</div>
                            )}
                            {ActiveComponent === 'EventPosting' && EventData.map((eventItem) => {
                                // console.log(`boolean if this post id is in the array of registered ${eventItem.id} : ` + event_registry.includes(eventItem.id));
                                if (eventItem.archive_status == 'false') {
                                    return (
                                        <EventPostComponent key={eventItem.id} eventdata={eventItem} RegistredBoolean={event_registry.includes(eventItem.id)} ReInvokeFetchRegistry={FetchRegistry} TimeNow_Event={TimeNow_Event}></EventPostComponent>
                                    )
                                }
                            })}
                        </div>
                        <div className='flex flex-col gap-5 px-2 overflow-auto'>
                            {ActiveComponent == 'JobPosting' && (
                                <div className='mx-auto mt-2 text-3xl font-semibold xl:hidden font-noto'>Find a Job</div>
                            )}
                            {ActiveComponent === 'JobPosting' && JobData.map((jobItem) => {
                                if (jobItem.archive_status == 'false') {
                                    return (
                                        <JobPostComponent key={jobItem.id} jobdata={jobItem} RegisteredBoolean={job_registry.includes(jobItem.id)} ReInvokeFetchRegistry={FetchRegistry} TimeNow_Job={TimeNow_Job}></JobPostComponent>
                                    )
                                }
                            })}
                        </div>
                        {/* InboxComponent */}
                        {ActiveComponent === 'Chat' && (<ChatSection></ChatSection>)}

                        <div className='flex flex-col gap-5 px-2 pt-2 overflow-auto'>
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
