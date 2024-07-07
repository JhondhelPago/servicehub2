import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import { ClientUserContext } from "../../pages/ClientUserContext";


const InboxComponent = () => {

    const { clientuserId } = useContext(ClientUserContext);

    const [InboxContact, SetInboxContact] = useState([]);

    //function to fetch the inbox of the clientuser using the clientuserId


    const FetchMailInbox = async () => {

        try {

            const response = await axios.get(`/FetchMailInbox/Client/${clientuserId}`);
            const InboxListAdmin = response.data;
            SetInboxContact(InboxListAdmin);


        } catch (error) {
            console.log(error);
            throw error;
        }
    }



    useEffect(() => {

        FetchMailInbox();
        console.log(InboxContact);

    }, [])



    // const [MailOverViewObj, SetMailOverViewObj] = useState(null);


    // const placeMailOverViewObj = (MailObj) => {
    //     SetMailOverViewObj(MailObj);
    // }









    const [MailOverViewBoolean, SetMailOverViewBoolean] = useState(null);

    const [MailOverViewAdminId, SetMailOverViewAdminId] = useState(null);

    const [MailObjsArray, SetMailObjsArray] = useState([]);


    const ClickInboxAction = async (adminId) => {

        await FetchConvo_Client_Admin(adminId);

        if (MailOverViewAdminId !== adminId) {
            SetMailOverViewBoolean(null);
            SetMailOverViewAdminId(null);
            SetMailOverViewAdminId([]);

            await FetchConvo_Client_Admin(adminId);


        }
    }

    const CloseMailOverViewAction = () => {
        SetMailOverViewBoolean(null);
        SetMailOverViewAdminId(null);
        SetMailObjsArray(null);
    }

    const FetchConvo_Client_Admin = async (SenderAdminId) => {

        try {

            const response = await axios.get(`/GetClient/Convo/WithAdmin/${clientuserId}/${SenderAdminId}`);
            const ConversationMailArray = response.data
            console.log(ConversationMailArray);
            SetMailObjsArray(ConversationMailArray);
            SetMailOverViewBoolean(true);
            SetMailOverViewAdminId(SenderAdminId);

        } catch (error) {
            throw error;
        }
    }







    // redering return ng InboxComponent
    return (
        <>
            {/* <!-- inbox list/content container --> */}
            <div className="flex h-full pb-5 overflow-auto rounded">
                {/* <!-- mail list container --> */}
                <div className="flex flex-col w-full overflow-hidden border border-l min-w-80 border-darkColor rounded-s">
                    <div className="flex justify-between w-full p-2 border-b border-darkColor bg-extra-extra-light">
                        <div className="flex gap-2">
                            <input type="checkbox" />
                            <label for="">Select All {InboxContact.length}</label>

                        </div>
                        <button className="hover:text-red-600">
                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                        </button>
                    </div>
                    {/* <!-- mail items container --> */}
                    <div className="pb-5 overflow-auto">


                        {/* {InboxArray.map((Inbox) => {
                        return(
                            <MailListView MailObj={Inbox} ListMailClick={placeMailOverViewObj}></MailListView>
                        )
                    })} */}

                        {InboxContact.map((AdminContactId) => {
                            return (
                                <MailListView AdminContactId={AdminContactId} ClickInboxAction={ClickInboxAction}></MailListView>
                            )
                        })}



                        {/* <!-- mail active sample --> */}
                        {/* <div className="grid grid-cols-7 gap-4 p-2 border-b border-darkColor activeMailItem group/del">
                            <label className="flex col-span-2 gap-2" for="">
                                <input type="checkbox" />
                                <!-- from -->
                                <h6 className="truncate">User1 User1User1</h6>
                            </label>
                            <!-- subject -->
                            <h6 className="col-span-3 truncate">SubjectasdadSubjectasdad</h6>
                            <h6 className="col-span-2 my-auto text-xs justify-self-end group-hover/del:hidden">00/00/00</h6>
                            <button className="hidden col-span-2 justify-self-end group-hover/del:inline hover:text-red-600">
                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                            </button>
                        </div> */}
                    </div>
                </div>
                {/* <!-- mail content view --> */}
                {/* 5. another child component */}
                {/* yung boung view ng Email  */}
                {MailOverViewBoolean && (
                    <MailOverView MailObjsArray={MailObjsArray} ContactAdminId={MailOverViewAdminId} CloseMailOverViewAction={CloseMailOverViewAction}></MailOverView>
                )}
            </div>
        </>
    )
}



// component definition of the MailListView
const MailListView = ({ MailObj, ListMailClick, AdminContactId, ClickInboxAction }) => {

    // activeMailItem
    // hoverMailItem

    // const { clientuserId } = useContext(ClientUserContext);

    const SenderAdminId = AdminContactId;

    return (
        <>
            <div className="grid grid-cols-7 gap-4 p-2 border-b border-darkColor hoverMailItem group/del" onClick={() => { ClickInboxAction(SenderAdminId) }}>
                <label className="flex col-span-2 gap-2" htmlFor="">
                    <input type="checkbox" />
                    {/* <!-- from --> */}
                    <h6 className="truncate">{AdminContactId}</h6>
                </label>
                {/* <!-- subject --> */}
                <h6 className="col-span-3 truncate">Sample Admin Subject</h6>
                <h6 className="col-span-2 my-auto text-xs justify-self-end group-hover/del:hidden">date_sent time_sent</h6>
                <button className="hidden col-span-2 justify-self-end group-hover/del:inline hover:text-red-600">
                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                </button>
            </div>

        </>
    )
}


// component definition of the MailOverView
const MailOverView = ({ MailObjsArray, ContactAdminId, CloseMailOverViewAction }) => {

    const Overflow_InnerInbox = useRef(null);
    const { clientuserId } = useContext(ClientUserContext);

    useEffect(() => {

        if (Overflow_InnerInbox.current) {
            Overflow_InnerInbox.current.scrollTop = Overflow_InnerInbox.current.scrollHeight;
        }

    }, [])




    const [ReplyButtonState, SetReplyButtonState] = useState(false);

    const ReplyActivate = () => {
        SetReplyButtonState(true);
    }

    return (
        <>

            {/* <!-- mail content view --> */}
            {/*  vin need ko dito ng div na pag lalagyan ng close button 
                pag nag clcick sa button mag disappear yung MailOverView
            */}

            <div ref={Overflow_InnerInbox} className="relative flex flex-col w-3/4 overflow-auto border-t border-b border-r border-darkColor">

                <div className="sticky top-0 w-full bg-black">
                    <div className="flex justify-between w-full p-2 border-b border-darkColor bg-extra-extra-light">
                        <p className="">Admin Name</p>
                        {/* <p className="">Subj</p> */}

                        {/* close btn */}
                        <button className="hover:text-red-600">
                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4" /></svg>
                        </button>
                    </div>
                </div>

                {/* <div className="overflow-auto"> */}
                {/* pag dito ko nilagay yung overflow auto di nagana yung kusa magsscroll sa baba. pag kasi dito nakalagay yung overflow-auto di kasama sa scroll yung x bali mageextend siya ng full. ikaw bahala kung oks na sayo to o ayusin mo pa */}
                {MailObjsArray.map((MailObj) => {
                    // return(

                    //     //conditional logic here to determine the component to render for receiver and sender
                    //     //<MailInnerView MailObj={MailObj}></MailInnerView>
                    // )

                    if (MailObj.senderID === clientuserId) {
                        return (
                            <MailInnerViewUserSender MailObj={MailObj}></MailInnerViewUserSender>
                        )
                    } else {
                        return (
                            <MailInnerView MailObj={MailObj}></MailInnerView>
                        )
                    }
                })}
                {/* </div> */}

                <div className="flex justify-around gap-5 px-5 my-2 font-medium lg:px-0">
                    {/* <button className="w-full py-2 border rounded border-darkColor scaleHover hover:bg-extra-light">Forward</button> */}
                    <button className="w-full lg:w-[80%] py-2 text-white rounded bg-primary-light scaleHover" onClick={() => { ReplyActivate() }}>Reply</button>

                </div>

                {/* {ReplyButtonState == true && <Replyform></Replyform>} */}
                <div className="h-auto">
                    {ReplyButtonState === true && <Replyform ContactAdminId={ContactAdminId}></Replyform>}

                </div>
            </div>
        </>
    )

}

const MailInnerView = ({ MailObj }) => {
    return (
        <>
            <div className='m-2 w-[80%] rounded-lg p-2 gap-2 flex flex-col bg-extra-light'>

                <div className="flex flex-row flex-wrap items-center justify-between gap-2" id="takenHeight">
                    {/* <h4 className="font-light">From: <span className="font-medium">{MailObj.senderID}</span></h4>
                        <h4 className="font-light">To: <span className="font-medium">{MailObj.receiverID}</span></h4> */}

                    <h4 className="text-xs">00/00/00</h4>
                    <h4 className="text-xs">00:00</h4>
                </div>

                <h3 className="text-xl font-medium text-center break-words">{MailObj.subject}</h3>
                {/* <!-- body --> */}
                <div className="flex flex-col overflow-auto" id="remainingHeight">
                    {/* <img className="max-h-[30vh] mx-auto w-fit mb-2 object-contain rounded-md" src={require("../../assets/sample2.jpg")}></img> */}
                    <p>{MailObj.body}</p>
                </div>
            </div>
        </>
    )
}

const MailInnerViewUserSender = ({ MailObj }) => {
    return (
        <>
            <div className='m-2 w-[80%] ml-auto rounded-lg p-2 gap-2 flex flex-col border border-darkColor'>
                <div className="flex flex-row flex-wrap items-center justify-between gap-2" id="takenHeight">
                    {/* <h4 className="font-light">From: <span className="font-medium">{MailObj.senderID}</span></h4>
                        <h4 className="font-light">To: <span className="font-medium">{MailObj.receiverID}</span></h4> */}

                    <h4 className="text-xs">00/00/00</h4>
                    <h4 className="text-xs">00:00</h4>
                </div>

                <h3 className="text-xl font-medium text-center break-words">{MailObj.subject}</h3>
                {/* <!-- body --> */}
                <div className="flex flex-col overflow-auto" id="remainingHeight">
                    {/* <img className="max-h-[30vh] mx-auto w-fit mb-2 object-contain rounded-md" src={require("../../assets/sample2.jpg")}></img> */}
                    <p>{MailObj.body}</p>
                </div>
            </div>
        </>
    )

}



const Replyform = ({ ContactAdminId }) => {

    return (
        <>
            <div className="flex mx-auto w-full p-5 lg:w-[80%]">
                {/* <!-- form container --> */}
                <form method='post' className="flex flex-col w-full gap-5 rounded">
                    <div className="flex flex-wrap items-center w-full gap-2">
                        <h4 className="flex shrink" >To: {ContactAdminId}</h4>
                        <input className="flex px-4 py-2 bg-white border rounded border-darkColor grow" type="hidden" value={ContactAdminId} />

                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <label className="flex shrink" htmlFor="">Subject:</label>
                        <input className="flex min-w-full px-4 py-2 bg-white border rounded border-darkColor" type="text" />
                    </div>

                    {/* <!-- <label className="opacity-70" for="">To:</label> --> */}
                    <textarea className="w-full h-full min-h-[300px] px-4 py-2 bg-white border rounded border-darkColor" name="" id="" cols="30" rows="10" placeholder="Message goes here."></textarea>

                    <div className="flex items-center w-full mx-auto border rounded border-darkColor">
                        <input class="file:mr-4 w-full file:py-4 file:border-darkColor file:px-4 file:border-r file:border-l-0 file:border-t-0 file:border-b-0 file:font-medium file:bg-transparent file:text-primary-light hover:file:text-white hover:file:bg-primary-light" id="" type="file" multiple />
                    </div>

                    <div className="w-full mx-auto text-center">
                        <button type="submit" className="w-full py-2 text-white rounded bg-primary-light scaleHover" >Send</button>
                    </div>
                </form>
            </div>

        </>
    )
}

export default InboxComponent;
