import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import { ClientUserContext } from "../../pages/ClientUserContext";


const InboxComponent = () => {

    const { clientuserId } = useContext(ClientUserContext);

    const [InboxContact, SetInboxContact] = useState([]);

    //function to fetch the inbox of the clientuser using the clientuserId


    const FetchMailInbox = async () => {

        try {

            const response = await axios.get(`/New/FetchMailInbox/Client/${clientuserId}`);
            const InboxListAdmin = response.data;


            console.log(InboxListAdmin);
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
                    <MailOverView MailObjsArray={MailObjsArray} ContactAdminId={MailOverViewAdminId} CloseMailOverViewAction={CloseMailOverViewAction} FetchConvo_Client_Admin={FetchConvo_Client_Admin}></MailOverView>
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
const MailOverView = ({ MailObjsArray, ContactAdminId, CloseMailOverViewAction, FetchConvo_Client_Admin = { FetchConvo_Client_Admin } }) => {

    const Overflow_InnerInbox = useRef(null);
    const { clientuserId } = useContext(ClientUserContext);

    useEffect(() => {

        //call the XButton_FalseState here if there is a problem

        if (Overflow_InnerInbox.current) {
            Overflow_InnerInbox.current.scrollTop = Overflow_InnerInbox.current.scrollHeight;
        }


    }, [])




    const [ReplyButtonState, SetReplyButtonState] = useState(false);

    const ReplyActivate = () => {
        SetReplyButtonState(true);
    }

    const ReplyDeactivate = () => {
        SetReplyButtonState(false);
    }


    const [XButtonBoolState, setXButtonBoolState] = useState(false);

    const XButton_TrueState = () => {
        setXButtonBoolState(true);
    }

    const XButton_FalseState = () => {
        setXButtonBoolState(false);
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
                        <button className="hover:text-red-600" onClick={CloseMailOverViewAction}>
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
                    {ReplyButtonState === true && <Replyform ContactAdminId={ContactAdminId} ReplyDeactivate={ReplyDeactivate} FetchConvo_Client_Admin={FetchConvo_Client_Admin}></Replyform>}

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

                    <h4 className="text-xs">{MailObj.date_sent}</h4>
                    <h4 className="text-xs">{MailObj.time_sent}</h4>
                </div>

                <h3 className="text-xl font-medium text-center break-words">{MailObj.subject}</h3>
                <div className="flex flex-col overflow-auto" id="remainingHeight">
                    <p className="mx-5 mb-3">{MailObj.body}</p>

                    <div className="mx-5">
                        {/* image */}
                        <img className="max-h-[30vh] mb-3 w-fit h-fit object-contain rounded-md" src={require("../../assets/sample2.jpg")}></img>
                    </div>

                    {/* files container */}
                    <div className="flex flex-row gap-3 px-5 pb-3 overflow-auto">

                        {/* button */}
                        <button className="flex items-center gap-3 p-2 border rounded border-darkColor group">
                            {/* docs icon */}
                            <svg className="text-blue-600 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12.186 14.552c-.617 0-.977.587-.977 1.373c0 .791.371 1.35.983 1.35c.617 0 .971-.588.971-1.374c0-.726-.348-1.349-.977-1.349" /><path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM9.155 17.454c-.426.354-1.073.521-1.864.521c-.475 0-.81-.03-1.038-.06v-3.971a8.16 8.16 0 0 1 1.235-.083c.768 0 1.266.138 1.655.432c.42.312.684.81.684 1.522c0 .775-.282 1.309-.672 1.639m2.99.546c-1.2 0-1.901-.906-1.901-2.058c0-1.211.773-2.116 1.967-2.116c1.241 0 1.919.929 1.919 2.045c-.001 1.325-.805 2.129-1.985 2.129m4.655-.762c.275 0 .581-.061.762-.132l.138.713c-.168.084-.546.174-1.037.174c-1.397 0-2.117-.869-2.117-2.021c0-1.379.983-2.146 2.207-2.146c.474 0 .833.096.995.18l-.186.726a1.979 1.979 0 0 0-.768-.15c-.726 0-1.29.438-1.29 1.338c0 .809.48 1.318 1.296 1.318M14 9h-1V4l5 5z" /><path fill="currentColor" d="M7.584 14.563c-.203 0-.335.018-.413.036v2.645c.078.018.204.018.317.018c.828.006 1.367-.449 1.367-1.415c.006-.84-.485-1.284-1.271-1.284" /></svg>

                            {/* label */}
                            <p className="truncate max-w-52 group-hover:underline">ansdjkfndfnan</p>
                        </button>

                        {/* sample button for pdf icon */}
                        <button className="flex items-center gap-3 p-2 border rounded border-darkColor group">
                            {/* docs icon */}
                            <svg className="text-red-600 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M8.267 14.68c-.184 0-.308.018-.372.036v1.178c.076.018.171.023.302.023c.479 0 .774-.242.774-.651c0-.366-.254-.586-.704-.586m3.487.012c-.2 0-.33.018-.407.036v2.61c.077.018.201.018.313.018c.817.006 1.349-.444 1.349-1.396c.006-.83-.479-1.268-1.255-1.268" /><path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM9.498 16.19c-.309.29-.765.42-1.296.42a2.23 2.23 0 0 1-.308-.018v1.426H7v-3.936A7.558 7.558 0 0 1 8.219 14c.557 0 .953.106 1.22.319c.254.202.426.533.426.923c-.001.392-.131.723-.367.948m3.807 1.355c-.42.349-1.059.515-1.84.515c-.468 0-.799-.03-1.024-.06v-3.917A7.947 7.947 0 0 1 11.66 14c.757 0 1.249.136 1.633.426c.415.308.675.799.675 1.504c0 .763-.279 1.29-.663 1.615M17 14.77h-1.532v.911H16.9v.734h-1.432v1.604h-.906V14.03H17zM14 9h-1V4l5 5z" /></svg>

                            {/* label */}
                            <p className="truncate max-w-52 group-hover:underline">ansdjkfndfnan</p>

                            {/* <span className="relative truncate max-w-52 group-hover:underline">
                                <div class="absolute bottom-[calc(100%+0.5rem)] left-[50%] -translate-x-[50%] hidden group-hover:block w-auto">
                                    <div class="bottom-full right-0 rounded bg-black px-4 py-1 text-xs text-white whitespace-nowrap">
                                        Tooltip center
                                    </div>
                                </div>
                                <span>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos vero reprehenderit voluptatum earum sequi deleniti debitis illum sit, quaerat cumque?
                                </span>
                            </span> */}
                        </button>

                        {/* sample button for txt icon */}
                        <button className="flex items-center gap-3 p-2 border rounded border-darkColor group">
                            {/* docs icon */}
                            <svg className="h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM9.998 14.768H8.895v3.274h-.917v-3.274H6.893V14h3.105zm2.725 3.274l-.365-.731c-.15-.282-.246-.492-.359-.726h-.013c-.083.233-.185.443-.312.726l-.335.731h-1.045l1.171-2.045L10.336 14h1.05l.354.738c.121.245.21.443.306.671h.013c.096-.258.174-.438.276-.671l.341-.738h1.043l-1.139 1.973l1.198 2.069zm4.384-3.274h-1.104v3.274h-.917v-3.274h-1.085V14h3.105zM14 9h-1V4l5 5z" /></svg>

                            {/* label */}
                            <p className="truncate max-w-52 group-hover:underline">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos vero reprehenderit voluptatum earum sequi deleniti debitis illum sit, quaerat cumque?</p>
                        </button>
                    </div>
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

                    <h4 className="text-xs">{MailObj.date_sent}</h4>
                    <h4 className="text-xs">{MailObj.time_sent}</h4>
                </div>

                <h3 className="text-xl font-medium text-center break-words">{MailObj.subject}</h3>
                {/* <!-- body --> */}
                <div className="flex flex-col overflow-auto" id="remainingHeight">
                    <p className="mx-5 mb-3">{MailObj.body}</p>

                    <div className="mx-5">
                        {/* image */}
                        <img className="max-h-[30vh] mb-3 w-fit h-fit object-contain rounded-md" src={require("../../assets/sample2.jpg")}></img>
                    </div>

                    {/* files container */}
                    <div className="flex flex-row gap-3 px-5 pb-3 overflow-auto">

                        {/* button */}
                        <button className="flex items-center gap-3 p-2 border rounded border-darkColor group">
                            {/* docs icon */}
                            <svg className="text-blue-600 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12.186 14.552c-.617 0-.977.587-.977 1.373c0 .791.371 1.35.983 1.35c.617 0 .971-.588.971-1.374c0-.726-.348-1.349-.977-1.349" /><path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM9.155 17.454c-.426.354-1.073.521-1.864.521c-.475 0-.81-.03-1.038-.06v-3.971a8.16 8.16 0 0 1 1.235-.083c.768 0 1.266.138 1.655.432c.42.312.684.81.684 1.522c0 .775-.282 1.309-.672 1.639m2.99.546c-1.2 0-1.901-.906-1.901-2.058c0-1.211.773-2.116 1.967-2.116c1.241 0 1.919.929 1.919 2.045c-.001 1.325-.805 2.129-1.985 2.129m4.655-.762c.275 0 .581-.061.762-.132l.138.713c-.168.084-.546.174-1.037.174c-1.397 0-2.117-.869-2.117-2.021c0-1.379.983-2.146 2.207-2.146c.474 0 .833.096.995.18l-.186.726a1.979 1.979 0 0 0-.768-.15c-.726 0-1.29.438-1.29 1.338c0 .809.48 1.318 1.296 1.318M14 9h-1V4l5 5z" /><path fill="currentColor" d="M7.584 14.563c-.203 0-.335.018-.413.036v2.645c.078.018.204.018.317.018c.828.006 1.367-.449 1.367-1.415c.006-.84-.485-1.284-1.271-1.284" /></svg>

                            {/* label */}
                            <p className="truncate max-w-52 group-hover:underline">ansdjkfndfnan</p>
                        </button>

                        {/* sample button for pdf icon */}
                        <button className="flex items-center gap-3 p-2 border rounded border-darkColor group">
                            {/* docs icon */}
                            <svg className="text-red-600 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M8.267 14.68c-.184 0-.308.018-.372.036v1.178c.076.018.171.023.302.023c.479 0 .774-.242.774-.651c0-.366-.254-.586-.704-.586m3.487.012c-.2 0-.33.018-.407.036v2.61c.077.018.201.018.313.018c.817.006 1.349-.444 1.349-1.396c.006-.83-.479-1.268-1.255-1.268" /><path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM9.498 16.19c-.309.29-.765.42-1.296.42a2.23 2.23 0 0 1-.308-.018v1.426H7v-3.936A7.558 7.558 0 0 1 8.219 14c.557 0 .953.106 1.22.319c.254.202.426.533.426.923c-.001.392-.131.723-.367.948m3.807 1.355c-.42.349-1.059.515-1.84.515c-.468 0-.799-.03-1.024-.06v-3.917A7.947 7.947 0 0 1 11.66 14c.757 0 1.249.136 1.633.426c.415.308.675.799.675 1.504c0 .763-.279 1.29-.663 1.615M17 14.77h-1.532v.911H16.9v.734h-1.432v1.604h-.906V14.03H17zM14 9h-1V4l5 5z" /></svg>

                            {/* label */}
                            <p className="truncate max-w-52 group-hover:underline">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos vero reprehenderit voluptatum earum sequi deleniti debitis illum sit, quaerat cumque?</p>
                        </button>

                        {/* sample button for txt icon */}
                        <button className="flex items-center gap-3 p-2 border rounded border-darkColor group">
                            {/* docs icon */}
                            <svg className="h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM9.998 14.768H8.895v3.274h-.917v-3.274H6.893V14h3.105zm2.725 3.274l-.365-.731c-.15-.282-.246-.492-.359-.726h-.013c-.083.233-.185.443-.312.726l-.335.731h-1.045l1.171-2.045L10.336 14h1.05l.354.738c.121.245.21.443.306.671h.013c.096-.258.174-.438.276-.671l.341-.738h1.043l-1.139 1.973l1.198 2.069zm4.384-3.274h-1.104v3.274h-.917v-3.274h-1.085V14h3.105zM14 9h-1V4l5 5z" /></svg>

                            {/* label */}
                            <p className="truncate max-w-52 group-hover:underline">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos vero reprehenderit voluptatum earum sequi deleniti debitis illum sit, quaerat cumque?</p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )

}



const Replyform = ({ ContactAdminId, ReplyDeactivate, FetchConvo_Client_Admin }) => {

    const { clientuserId } = useContext(ClientUserContext);

    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [files, setFiles] = useState([]);



    const handleReplyForm = async (event) => {

        event.preventDefault();

        const formData = new FormData();
        formData.append('senderClientId', clientuserId);
        formData.append('receiverAdminId', ContactAdminId);
        formData.append('subject', subject);
        formData.append('message', message);


        //append the file to the formData;
        // files.forEach((file) => {
        //     formData.append('files', file);
        // });

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }


        //try to connect to the backend at the server file
        try {

            const response = await axios.post('/sendmail', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });




            console.log(`status: ${response.data}`);
            ReplyDeactivate();
            FetchConvo_Client_Admin(ContactAdminId);

        } catch (error) {
            console.log("Error at the reply button clientside: ", error);
            throw error;
        }



        //log the form inputs
    }

    const handleFileChange = (event) => {
        setFiles(event.target.files);
    }

    return (
        <>
            <div className="flex mx-auto w-full p-5 lg:w-[80%]">
                {/* <!-- form container --> */}
                <form id="replyForm" method='post' className="flex flex-col w-full gap-5 rounded" onSubmit={handleReplyForm}>
                    <div className="flex flex-wrap items-center w-full gap-2">
                        <h4 className="flex shrink" >To: {ContactAdminId}</h4>
                        <input className="flex px-4 py-2 bg-white border rounded border-darkColor grow" type="hidden" value={ContactAdminId} />

                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <label className="flex shrink" htmlFor="">Subject:</label>
                        <input className="flex min-w-full px-4 py-2 bg-white border rounded border-darkColor" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
                    </div>

                    {/* <!-- <label className="opacity-70" for="">To:</label> --> */}
                    <textarea className="w-full h-full min-h-[300px] px-4 py-2 bg-white border rounded border-darkColor" name="" id="" cols="30" rows="10" placeholder="Message goes here." value={message} onChange={(e) => setMessage(e.target.value)}></textarea>

                    <div className="flex items-center w-full mx-auto border rounded border-darkColor">
                        <input class="file:mr-4 w-full file:py-4 file:border-darkColor file:px-4 file:border-r file:border-l-0 file:border-t-0 file:border-b-0 file:font-medium file:bg-transparent file:text-primary-light hover:file:text-white hover:file:bg-primary-light" id="file" type="file" accept="image/*, .pdf, .doc, .docx, .txt" onChange={handleFileChange} multiple />
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
