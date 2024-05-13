import React from 'react';

import nav_logo from '../assets/nav logo dark.png';
import sample_img from '../assets/sample_img.jpg';


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
                        <div className="flex flex-wrap gap-4 p-4 xl:flex-nowrap eventCard">
                            {/* <!-- event info container --> */}
                            <div className="flex flex-col w-full gap-4 text-center lg:text-start xl:w-1/2">
                                {/* <!-- title --> */}
                                <h1 className="text-4xl font-semibold lg:text-6xl text-balance font-noto">Charity Program: The Chance to Work Again</h1>
                                <div className="flex flex-wrap justify-center gap-4 text-sm font-medium lg:text-lg lg:justify-start">
                                    {/* <!-- date --> */}
                                    <h3 className="tagBG">00/00/0000</h3>
                                    {/* <!-- time --> */}
                                    <h3 className="tagBG">00:00am</h3>
                                    {/* <!-- location --> */}
                                    <h3 className="tagBG">Location Location</h3>
                                </div>
                                {/* <!-- desc --> */}
                                <p className="px-2 mt-4 overflow-auto text-justify max-h-52">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia quod in nostrum ad cupiditate harum ullam ea assumenda excepturi at! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea illum, deleniti ipsum vel nihil ipsa provident, quaerat accusantium rerum veniam nulla velit voluptates eveniet, molestiae consequatur impedit voluptas expedita nesciunt quod molestias earum placeat. Pariatur, veritatis repudiandae. Nisi, provident sunt. A possimus esse repudiandae corporis consequatur magnam iste quaerat repellat, velit provident cum dolor quod alias sit suscipit odit officia quos nemo deserunt porro molestiae? Quis, consequuntur quibusdam fuga animi enim alias. Error porro beatae aliquid sapiente, facilis, odio at maxime excepturi facere pariatur ipsa. Eveniet soluta quisquam voluptatem accusantium labore! Tenetur neque expedita, molestiae ipsam ullam dolor doloribus molestias.</p>
                                <button className="w-10/12 p-4 mx-auto text-xl font-medium text-white rounded-md bg-primary-light scaleHover">Join</button>
                            </div>
                            {/* <!-- img container --> */}
                            <div className="order-first w-full xl:w-1/2 xl:order-last">
                                {/* <!-- id="smallImg" onclick="enlargeImg()" --> */}
                                <img className="object-cover w-full h-full rounded-md" src={sample_img} alt="img" />
                            </div>
                            {/* <!-- join btn --> */}
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}


export default Homepage;