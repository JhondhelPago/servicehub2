import React from "react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../LoginComponents/UserContext";

const InboxComponent = () => {
    

    const { AdminId } = useContext(UserContext); // 0. AdminId useContext ang laman is yung AdminId netong loginSession

    const [Inbox, setInbox] = useState([]); //1. set a useState to store the Fetch Data from server 

    //this function will reload after the render of the return 
    useEffect(() => {  // useEffect special function na mag run after ng initial render

        FetchMail();


    }, []); // para mag run sa initial render dapat mag lagay ng empty array



    // 2. function para kumuha ng data sa server
    const FetchMail = async () => {

        try {

            const response = await fetch(`/Fetchmail/${AdminId}`); // ito yung route sa server tapos may parameter na AdminId -> which is the id of this loginSession
            const data = await response.json();

            //to set new value to the Inbox
            setInbox(data);


        } catch (error) {
            throw error;
        }

    }




    // below are realted to the MailOverView Data

    // 3. Another useState para paglagyan ng Data sa MailOverView
    const [MailOverViewData, setMailOverViewData] = useState(null); //Default value is null



    //4. funtion na ipapasok sa child component 
    const SelectedMailData = (MailObject) => {  // itong function na toh is triggered from the child component

        setMailOverViewData(MailObject); // just like the first, setting new value for the useState variable

    }





    // redering return ng InboxComponent
    return (
        <>
            {/* <!-- inbox list/content container --> */}
            <div className="flex px-5 pb-5 overflow-auto rounded h-svh">
                {/* <!-- mail list container --> */}
                <div className="flex flex-col w-full overflow-hidden border-l min-w-80 border-y border-darkColor rounded-s">
                    <div className="flex justify-between w-full p-2 border-b border-r border-darkColor bg-extra-extra-light">
                        <div className="flex gap-2">
                            <input type="checkbox" />
                            <label for="">Select All {Array.isArray(Inbox) ? 1 : 0}</label>

                        </div>
                        <button className="hover:text-red-600">
                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                        </button>
                    </div>
                    {/* <!-- mail items container --> */}
                    <div className="pb-5 overflow-auto border-r border-darkColor h-svh">

                        {/*  Inbox ba ay not null &&==then  Inbox.map()=loop for every element */}
                        {Inbox && Inbox.map((MailData) => { //MailData is Default parameter, ang value nyan is yung object sa current map

                            // redering the MailListView Component
                            return (
                                <MailListView MailObj={MailData} SelectedMailData={SelectedMailData}></MailListView>
                            )
                        })}

                        {/* <!-- mail active sample --> */}
                        <div className="grid grid-cols-7 gap-4 p-2 border-b border-darkColor activeMailItem group/del">
                            <label className="flex col-span-2 gap-2" for="">
                                <input type="checkbox" />
                                {/* <!-- from --> */}
                                <h6 className="truncate">User1 User1User1</h6>
                            </label>
                            {/* <!-- subject --> */}
                            <h6 className="col-span-3 truncate">SubjectasdadSubjectasdad</h6>
                            <h6 className="col-span-2 my-auto text-xs justify-self-end group-hover/del:hidden">00/00/00</h6>
                            <button className="hidden col-span-2 justify-self-end group-hover/del:inline hover:text-red-600">
                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
                {/* <!-- mail content view --> */}
                {/* 5. another child component */}
                {/* yung boung view ng Email  */}
                {MailOverViewData && <MailOverView MailOverViewData={MailOverViewData}></MailOverView>}
            </div>
        </>
    )
}



// component definition of the MailListView
const MailListView = (props) => {

    const { SelectedMailData } = props;

    return (
        <>
            <div className="grid grid-cols-7 gap-4 p-2 border-b border-darkColor hoverMailItem group/del" onClick={() => { SelectedMailData(props.MailObj) }}>
                <label className="flex col-span-2 gap-2" for="">
                    <input type="checkbox" />
                    {/* <!-- from --> */}
                    <h6 className="truncate">{props.MailObj.firstName}</h6>
                </label>
                {/* <!-- subject --> */}
                <h6 className="col-span-3 truncate">{props.MailObj.subject}</h6>
                <h6 className="col-span-2 my-auto text-xs justify-self-end group-hover/del:hidden">{props.MailObj.date_sent + ' ' + props.MailObj.time_sent}</h6>
                <button className="hidden col-span-2 justify-self-end group-hover/del:inline hover:text-red-600">
                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                </button>
            </div>

        </>
    )
}


// component definition of the MailOverView
const MailOverView = (props) => {

    return (
        <>
            {/* <!-- mail content view --> */}
            <div className="flex flex-col w-3/4 border-t border-b border-r border-darkColor rounded-e">
                <div className="flex flex-col gap-1 p-4 rounded-tr bg-extra-extra-light" id="takenHeight">
                    <h3 className="text-xl font-medium break-words md:text-center">{props.MailOverViewData.subject}</h3>
                    <div className="flex flex-col justify-between gap-1 md:flex-row">
                        <h5 className="font-light md:order-last">{props.MailOverViewData.date_sent}</h5>
                        <h4 className="font-light">From: <span className="font-medium">{props.MailOverViewData.firstName}</span></h4>
                    </div>
                    <div className="flex flex-col justify-between gap-1 md:flex-row">
                        <h5 className="font-light md:order-last">{props.MailOverViewData.time_sent}</h5>
                        <h4 className="font-light">To: <span className="font-medium">{props.MailOverViewData.receiverID}</span></h4>
                    </div>
                </div>
                {/* <!-- body --> */}
                <div className="relative flex flex-col gap-6 p-4 overflow-auto" id="remainingHeight">
                    {props.MailOverViewData.body}
                    <div className="flex justify-around gap-5 px-5 font-medium">
                        <button className="w-full py-2 border rounded border-darkColor scaleHover hover:bg-extra-light">Forward</button>
                        <button className="w-full py-2 text-white rounded bg-primary-light scaleHover">Reply</button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default InboxComponent;