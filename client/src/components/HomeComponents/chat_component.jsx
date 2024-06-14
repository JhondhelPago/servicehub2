import React , { useState }from 'react';

import InboxComponent from './inbox_component';
import SentComponent from './sent_component';
import ComposeComponent from './compose_component';
import { Select } from '@headlessui/react';

const ChatSection = () => {


    const [ActiveComponent, setActiveComponent] = useState('inbox');

    const SelectComponent = (ComponentSection) => {
        setActiveComponent(ComponentSection);
    }


    const ActivateSentComponent = () => {
        setActiveComponent('sent');
    }


    return(
        <>
            <div id="mainContentContainer" className="pb-0.5 w-full h-screen flex flex-col flex-grow bg-gray-100 text-darkColor overflow-hidden">
                <div className="py-5 px-5 mb-5 gap-2 flex items-center justify-between sticky top-0 bg-gray-100">
                    <h1 className="text-2xl md:text-4xl font-medium">Manage Inquiries</h1>
                    {/* <!-- search bar --> */}
                    <form className="p-0 m-0 flex justify-between items-center rounded border border-darkColor bg-transparent">
                        <input className="p-2 h-full w-32 focus:bg-white md:w-auto focus:outline-none bg-transparent" type="text" placeholder="Search"/>
                        <button className="p-2 hover:text-white hover:bg-darkerColor" type="submit">
                            <svg className="h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M10.5 2a8.5 8.5 0 1 0 5.262 15.176l3.652 3.652a1 1 0 0 0 1.414-1.414l-3.652-3.652A8.5 8.5 0 0 0 10.5 2M4 10.5a6.5 6.5 0 1 1 13 0a6.5 6.5 0 0 1-13 0"/></g></svg>
                        </button>
                    </form>
                </div>

                {/* <!-- inbox/sent/compose --> */}
                <div className="mx-5 mb-5 flex flex-col gap-5 items-center">
                    <div className="w-full flex md:text-xl gap-0.5 rounded border border-darkColor bg-extra-extra-light">
                        <button className="p-2 w-full flex justify-center activeMail" onClick={() => {SelectComponent('inbox')}} >Inbox</button>
                        {/* <button className="p-2 w-full flex justify-center hoverMail" onClick={() => {SelectComponent('sent')}}>Sent</button> */}
                        <button className="p-2 w-full flex justify-center hoverMail" onClick={() => {SelectComponent('compose')}}>Compose</button>
                    </div>
                </div>

                {/* Component will render here based on the selected component */}

                {ActiveComponent === 'inbox' && (<InboxComponent></InboxComponent>)}
                {ActiveComponent === 'sent' && (<SentComponent></SentComponent>)}
                {ActiveComponent === 'compose' && (<ComposeComponent RenderSentItem={ActivateSentComponent}></ComposeComponent>)}


                
            </div>
        
        </>
    )
}


export default ChatSection;