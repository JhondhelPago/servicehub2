import React from 'react';

import nav_logo from '../assets/nav logo dark.png';

import EventPostComponent from '../components/event_post_component.jsx';

const Homepage = () => {

    return (
        <>
            <head>
                <title>Welcome to ServiceHub</title>
            </head>
            <div className='min-h-screen bg-gray-100 min-w-screen'>
                <div className="flex flex-col font-poppins text-darkColor">
                    {/* <!-- nav --> */}
                    <nav className="container sticky top-0 grid items-center grid-cols-2 p-5 mx-auto bg-gray-100 lg:flex">
                        {/* <!-- logo container --> */}
                        <div className="">
                            <img className="h-10 select-none" src={nav_logo} alt="logo" />
                        </div>
                        {/* <!-- menu btn --> */}
                        <button className="flex h-full ml-auto rounded lg:hidden text-primary-light focus:outline-none focus:ring-primary-light focus:ring-1" id="navBtn" onclick="openNav()">
                            <svg className="h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M4 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 12a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m7-7a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2z" /></svg>
                        </button>
                        {/* <!-- links container --> */}
                        <div className="hidden col-span-2 font-medium lg:ml-auto lg:col-span-1 lg:flex" id="navLinksContainer">
                            <ul className="grid gap-10 pt-5 mx-auto text-center w-fit lg:pt-0 lg:flex lg:gap-20 lg:w-auto">
                                <li className="activeUserLink">
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
                                </li>
                            </ul>
                        </div>
                    </nav>
                    {/* <!-- main content container --> */}
                    <div className="container flex flex-col justify-center gap-5 p-5 mx-auto">
                        {/* <!-- event post container --> */}
                        <EventPostComponent></EventPostComponent>

                    </div>
                </div>
            </div>

        </>
    )
}


export default Homepage;