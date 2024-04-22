import React from 'react';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import nav_logo_white from '../../assets/nav logo white.png';
import icon_logo from '../../assets/icon logo.png';
import admin_icon from '../../assets/adminIcon.png';


import JobPosting from './Job_Post';
import PostForm from './create_post';
import Homeprompt from './homeprompt';


const HomeComponent = () => {

    

    const navigate = useNavigate();

    const HandleNavigateHome = () => {
        navigate('/home')
    }

    //initializing useState
    const [ActiveComponent, setActiveComponent] = useState('dashboard');

    const SelectComponent = (Component) => {
        setActiveComponent(Component);
    }



    return (
        <>
            

            <div className="flex font-poppins">
                {/* <!-- nav --> */}
                <nav className="sticky top-0 h-screen py-7 px-3 flex flex-col gap-7 bg-gradient-to-b from-gradient-dark-from to-gradient-dark-to text-white group/label">
                    <div className="flex gap-10 px-2 justify-center items-center" id="logoContainer">
                        {/* <!-- <label for=""><img class="h-10" src="./assets/nav logo white.png" alt="logo" id="logo1"></label> --> */}
                        <img className="h-10 object-contain hidden group-hover/label:flex" src={nav_logo_white} alt="logo" id="expandedLogo"/>
                        <img className="h-10 object-contain group-hover/label:hidden" src={icon_logo} alt="logo" id="minimizedLogo"/>

                        {/* <!-- <button class="group/tooltip relative" onclick="expandNav()" id="expandNavBtn"><svg class="w-14 p-3 rounded-full hover:cursor-pointer navHover" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="18" height="1.5" x="3" y="7.001" fill="currentColor" rx=".75"/><rect width="15" height="1.5" x="3" y="11.251" fill="currentColor" rx=".75"/><rect width="18" height="1.5" x="3" y="15.499" fill="currentColor" rx=".75"/></svg>
                            <span class="px-5 rounded font-normal absolute start-24 top-3 -z-[1] invisible group-hover/tooltip:visible bg-darkColor">Expand</span>
                        </button>

                        <button class="hidden" onclick="minimizeNav()" id="minimizeNavBtn"><svg class="w-14 p-3 rounded-full hover:cursor-pointer navHover" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M15.488 4.43a.75.75 0 0 1 .081 1.058L9.988 12l5.581 6.512a.75.75 0 1 1-1.138.976l-6-7a.75.75 0 0 1 0-.976l6-7a.75.75 0 0 1 1.057-.081" clip-rule="evenodd"/></svg></button> --> */}
                    </div>
                    {/* <!-- links --> */}
                    <div className="h-full flex flex-col gap-1 overflow-auto" id="linksContainer">
                        <button className="group-hover/label:justify-between activeLink group/tooltip" id="links" onClick={() => {SelectComponent('dashboard')}}>
                            <label className="hidden mr-3 group-hover/label:flex">Dashboard</label>
                            <svg className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M13 6.5H9a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V7a.5.5 0 0 0-.5-.5m0-6H9a.5.5 0 0 0-.5.5v2.01a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V1a.5.5 0 0 0-.5-.5m-8 0H1a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V1A.5.5 0 0 0 5 .5m0 9.99H1a.5.5 0 0 0-.5.5V13a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-2.01a.5.5 0 0 0-.5-.5"/></svg>
                            {/* <!-- <span class="px-5 rounded font-normal absolute start-24 -z-[1] invisible group-hover/tooltip:visible bg-darkColor">Dashboard</span> --> */}
                        </button>

                        <button className="group-hover/label:justify-between navHover group/tooltip" id="links" >
                            <label className="hidden mr-3 group-hover/label:flex">Event Posting</label>
                            <svg className="w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M14.885 18q-.877 0-1.497-.62q-.619-.618-.619-1.495q0-.877.62-1.497q.619-.619 1.496-.619t1.496.62q.619.619.619 1.496t-.62 1.496q-.618.619-1.495.619m-9.27 3q-.69 0-1.152-.462Q4 20.075 4 19.385V6.615q0-.69.463-1.152Q4.925 5 5.615 5h1.77V2.77h1.077V5h7.153V2.77h1V5h1.77q.69 0 1.152.463q.463.462.463 1.152v12.77q0 .69-.462 1.152q-.463.463-1.153.463zm0-1h12.77q.23 0 .423-.192q.192-.193.192-.423v-8.77H5v8.77q0 .23.192.423q.193.192.423.192M5 9.615h14v-3q0-.23-.192-.423Q18.615 6 18.385 6H5.615q-.23 0-.423.192Q5 6.385 5 6.615zm0 0V6z"/></svg>
                            {/* <!-- <span class="px-5 rounded font-normal absolute start-24 -z-[1] invisible group-hover/tooltip:visible bg-darkColor">Event Posting</span> --> */}
                        </button>

                        <button className="group-hover/label:justify-between navHover group/tooltip" id="links" onClick={() => {SelectComponent('job_posting')}}>
                            <label className="hidden mr-3 group-hover/label:flex">Job Posting</label>
                            <svg className="w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M4.615 20q-.69 0-1.152-.462Q3 19.075 3 18.385v-9.77q0-.69.463-1.152Q3.925 7 4.615 7H9V5.615q0-.69.463-1.152Q9.925 4 10.615 4h2.77q.69 0 1.153.463q.462.462.462 1.152V7h4.385q.69 0 1.152.463q.463.462.463 1.152v9.77q0 .69-.462 1.152q-.463.463-1.153.463zm0-1h14.77q.23 0 .423-.192q.192-.193.192-.423v-9.77q0-.23-.192-.423Q19.615 8 19.385 8H4.615q-.23 0-.423.192Q4 8.385 4 8.615v9.77q0 .23.192.423q.193.192.423.192M10 7h4V5.615q0-.23-.192-.423Q13.615 5 13.385 5h-2.77q-.23 0-.423.192q-.192.193-.192.423zM4 19V8z"/></svg>
                            {/* <!-- <span class="px-5 rounded font-normal absolute start-24 -z-[1] invisible group-hover/tooltip:visible bg-darkColor">Job Posting</span> --> */}
                        </button>

                        <button className="group-hover/label:justify-between navHover group/tooltip" id="links" onClick={() => {SelectComponent('create_post')}}>
                            <label className="hidden mr-3 group-hover/label:flex">Create Post</label>
                            <svg className="w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M384 224v184a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V168a40 40 0 0 1 40-40h167.48"/><path fill="currentColor" d="M459.94 53.25a16.06 16.06 0 0 0-23.22-.56L424.35 65a8 8 0 0 0 0 11.31l11.34 11.32a8 8 0 0 0 11.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38M399.34 90L218.82 270.2a9 9 0 0 0-2.31 3.93L208.16 299a3.91 3.91 0 0 0 4.86 4.86l24.85-8.35a9 9 0 0 0 3.93-2.31L422 112.66a9 9 0 0 0 0-12.66l-9.95-10a9 9 0 0 0-12.71 0"/></svg>
                            {/* <!-- <span class="px-5 rounded font-normal absolute start-24 -z-[1] invisible group-hover/tooltip:visible bg-darkColor">Create Post</span> --> */}
                        </button>

                        <button className="group-hover/label:justify-between navHover group/tooltip" id="links" >
                            <label className="hidden mr-3 group-hover/label:flex">Inquiries</label>
                            <svg className="w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M9 2a4 4 0 1 0 0 8a4 4 0 0 0 0-8M6 6a3 3 0 1 1 6 0a3 3 0 0 1-6 0m-1.991 5A2.001 2.001 0 0 0 2 13c0 1.691.833 2.966 2.135 3.797C5.417 17.614 7.145 18 9 18c.41 0 .816-.019 1.21-.057a5.501 5.501 0 0 1-.618-.958C9.398 16.996 9.2 17 9 17c-1.735 0-3.257-.364-4.327-1.047C3.623 15.283 3 14.31 3 13c0-.553.448-1 1.009-1h5.59c.184-.358.405-.693.658-1zM14.5 19a4.5 4.5 0 1 1 0-9a4.5 4.5 0 0 1 0 9m.624-1.995a.625.625 0 1 0-1.249 0a.625.625 0 0 0 1.25 0m1.23-3.552c0-1.104-.823-1.95-1.854-1.95c-1.048 0-1.864.818-1.853 1.955a.5.5 0 1 0 1-.01c-.006-.579.36-.945.853-.945c.472 0 .853.392.853.95c0 .202-.07.315-.36.544l-.277.215c-.506.404-.716.717-.716 1.288a.5.5 0 0 0 .992.09l.011-.156c.017-.148.1-.254.346-.448l.277-.215c.513-.41.727-.732.727-1.318"/></svg>
                            {/* <!-- <span class="px-5 rounded font-normal absolute start-24 -z-[1] invisible group-hover/tooltip:visible bg-darkColor">Inquiries</span> --> */}
                        </button>

                        <button className="group-hover/label:justify-between navHover group/tooltip" id="links" >
                            <label className="hidden mr-3 group-hover/label:flex">Requests</label>
                            <svg className="w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M4 4.25A2.25 2.25 0 0 1 6.25 2h11.5A2.25 2.25 0 0 1 20 4.25v7.248a6.452 6.452 0 0 0-1.5-.422V4.25a.75.75 0 0 0-.75-.75H6.25a.75.75 0 0 0-.75.75v15.5c0 .414.336.75.75.75h5.482A6.518 6.518 0 0 0 12.81 22H6.25A2.25 2.25 0 0 1 4 19.75zM16.25 11c.11 0 .216.024.311.067a6.472 6.472 0 0 0-3.215 1.433H7.75a.75.75 0 0 1 0-1.5zm-8.5-4.5a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5zM23 17.5a5.5 5.5 0 1 0-11 0a5.5 5.5 0 0 0 11 0m-5 .5l.001 2.503a.5.5 0 1 1-1 0V18h-2.505a.5.5 0 0 1 0-1H17v-2.5a.5.5 0 1 1 1 0V17h2.497a.5.5 0 0 1 0 1z"/></svg>
                            {/* <!-- <span class="px-5 rounded font-normal absolute start-24 -z-[1] invisible group-hover/tooltip:visible bg-darkColor">Requests</span> --> */}
                        </button>

                        <button className="group-hover/label:justify-between navHover group/tooltip" id="links">
                            <label className="hidden mr-3 group-hover/label:flex">Mailbox</label>
                            <svg className="w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M18.372 3.03a2.45 2.45 0 0 0-1.345-.12l-.277.053v1.655a3.95 3.95 0 0 1 2.16.194c.428.165.892.206 1.34.12V3.275a3.677 3.677 0 0 1-1.8-.214zM16.75 6.145l.277-.054a2.45 2.45 0 0 1 1.345.12a3.95 3.95 0 0 0 2.344.154l.067-.016c.567-.136.967-.644.967-1.228v-2.22c0-.77-.72-1.336-1.468-1.156c-.429.103-.88.074-1.292-.085l-.08-.03a3.95 3.95 0 0 0-2.166-.193l-.486.093a1.243 1.243 0 0 0-1.008 1.22v3.5H7a.754.754 0 0 0-.136.012A5.25 5.25 0 0 0 1.25 11.5v5.267a2.983 2.983 0 0 0 2.983 2.983H9.75V22a.75.75 0 0 0 1.5 0v-2.25h2.5V22a.75.75 0 0 0 1.5 0v-2.25h4.543a2.957 2.957 0 0 0 2.957-2.957V11.5c0-2.9-2.35-5.25-5.25-5.25h-.75zm-1.5 1.604V11a.75.75 0 0 0 1.5 0V7.75h.75a3.75 3.75 0 0 1 3.75 3.75v5.293c0 .804-.652 1.457-1.457 1.457H11.75V11.5c0-1.47-.603-2.798-1.576-3.75zm-5 10.5V11.5a3.75 3.75 0 1 0-7.5 0v5.267c0 .819.664 1.483 1.483 1.483zm-6-2.25a.75.75 0 0 1 .75-.75h3a.75.75 0 1 1 0 1.5H5a.75.75 0 0 1-.75-.75" clipRule="evenodd"/></svg>
                            {/* <!-- <span class="px-5 rounded font-normal absolute start-24 -z-[1] invisible group-hover/tooltip:visible bg-darkColor">Mailbox</span> --> */}
                        </button>

                        <button className="group-hover/label:justify-between navHover group/tooltip mt-auto" id="links">
                            <label className="hidden flex-col font-extralight group-hover/label:flex" >
                                Administrative
                                <span className="font-normal">Admin Name A.</span>
                            </label>
                            <img className="h-7 w-7" src={admin_icon} alt="admin icon"/>
                            {/* <!-- <span class="px-5 rounded font-normal absolute start-24 -z-[1] invisible group-hover/tooltip:visible bg-darkColor">Profile</span> --> */}
                        </button>

                        <button className="group-hover/label:justify-between group/tooltip navHover hover:bg-red-600" id="links" href="#">
                            <label className="hidden mr-3 group-hover/label:flex">Logout</label>
                            <svg className="w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M5 3h6a3 3 0 0 1 3 3v4h-1V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4h1v4a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3m3 9h11.25L16 8.75l.66-.75l4.5 4.5l-4.5 4.5l-.66-.75L19.25 13H8z"/></svg>
                            {/* <!-- <span class="px-5 rounded font-normal absolute start-24 -z-[1] invisible group-hover/tooltip:visible bg-darkColor">Logout</span> --> */}
                        </button>
                    </div>
                </nav>
                {/* <!-- main content container --> */}
                
                   
                {ActiveComponent === 'dashboard' && <Homeprompt></Homeprompt>}
                {ActiveComponent === 'create_post' && <PostForm navigateHome={HandleNavigateHome} onClick={SelectComponent}></PostForm>}
                {ActiveComponent === 'job_posting' && <JobPosting></JobPosting>}

                        
                
            </div>
        </>
    )

}

export default HomeComponent;