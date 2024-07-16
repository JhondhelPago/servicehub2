import React from 'react';
import { useState } from 'react';

import InboxComponent from './inbox_component';
import SentComponent from './sent_component';
import ComposeComponent from './compose_component';

const Inquiries = () => {

    //initializing useState
    const [ActiveComponent, setActiveComponent] = useState('inbox');


    const SelectComponent = (Component) => {
        setActiveComponent(Component);
    }

    const RenderSentItems = () => {
        setActiveComponent('sent');
    }



    const [VarCon, SetVarCon] = useState('no trigger');

    const TriggerFromChild = () => {
        SetVarCon('Trigger from send buttton');
        console.log(`VarCon value: ${VarCon}`);
    }


    const [viewProfile, setViewProfile] = useState(false)
    const handleViewProfile = () => {
        if (viewProfile) setViewProfile(false)
        else setViewProfile(true)
    }


    return (
        <>

            {/* <div id="mainContentContainer" className="pb-0.5 w-full h-screen flex flex-col flex-grow bg-gray-100 text-darkColor overflow-hidden">
                <div className="sticky top-0 flex items-center justify-between gap-2 px-5 py-5 mb-5 bg-gray-100">
                    <h1 className="text-2xl font-medium md:text-4xl"> */}
            <div id="mainContentContainer" className="flex flex-col flex-grow h-screen pb-5 bg-gray-100 text-darkColor">
                <div className="sticky top-0 flex items-center justify-between gap-2 px-5 py-5 mb-5 bg-gray-100 ">
                    <h1 className="flex text-2xl font-medium md:text-4xl">
                        Manage Inquiries
                    </h1>
                    {/* <!-- search bar --> */}
                    <form className="flex items-center justify-between p-0 m-0 bg-transparent border rounded border-darkColor">
                        <input className="w-32 h-full p-2 bg-transparent border-0 focus:bg-white md:w-auto focus:outline-none focus:ring-0" type="text" placeholder="Search" />
                        <button className="p-2 hover:text-white hover:bg-darkerColor" type="submit">
                            <svg className="h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="M10.5 2a8.5 8.5 0 1 0 5.262 15.176l3.652 3.652a1 1 0 0 0 1.414-1.414l-3.652-3.652A8.5 8.5 0 0 0 10.5 2M4 10.5a6.5 6.5 0 1 1 13 0a6.5 6.5 0 0 1-13 0" /></g></svg>
                        </button>
                    </form>
                </div>

                {/* <!-- inbox/sent/compose --> */}
                {/* activeMail */}
                <div className="flex flex-col items-center gap-5 mx-5 mb-5">
                    <div className="flex w-full overflow-hidden border rounded md:text-xl border-darkColor bg-extra-extra-light">
                        <button className={`flex justify-center w-full p-2 ${ActiveComponent === 'inbox' ? 'activeMail' : 'hoverMail'}`} onClick={() => { SelectComponent('inbox') }} >Inbox</button>
                        {/* <button className="flex justify-center w-full p-2 hoverMail" onClick={() => { SelectComponent('sent') }}>Sent</button> */}
                        <button className={`flex justify-center w-full p-2 ${ActiveComponent === 'compose' ? 'activeMail' : 'hoverMail'}`} onClick={() => { SelectComponent('compose') }}>Compose</button>
                    </div>
                </div>

                {ActiveComponent === 'inbox' && <InboxComponent></InboxComponent>}
                {ActiveComponent === 'sent' && <SentComponent></SentComponent>}
                {ActiveComponent === 'compose' && <ComposeComponent ShowSentItem={RenderSentItems}></ComposeComponent>}
            </div>
        </>
    )
}

export default Inquiries;