import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../LoginComponents/UserContext";
import axios from "axios";

const InboxComponent = () => {



    const { AdminId } = useContext(UserContext); // 0. AdminId useContext ang laman is yung AdminId netong loginSession

    const [InboxClientIds, SetInboxClientIds] = useState([]);


    const FetchInboxClientIds = async () => {

        try {

            const response = await axios.get(`FetchMailInbox/Admin/${AdminId}`);
            const ClientIds = response.data;
            SetInboxClientIds(ClientIds);



        } catch (error) {
            throw error;
        }

    }


    //run aftert the initial render of the component
    useEffect(() => {
        FetchInboxClientIds();


    }, [])


    const [MailOverViewBoolean, SetMailOverViewBoolean] = useState(null);

    const [MailOverViewClientId, SetMailOverViewClientId] = useState(null);

    const [MailObjsArray, SetMailObjsArray] = useState([]);


    const ClickInboxAction = async (clientId) => {

        await FetchConvo_Admin_Client(clientId);


        if (MailOverViewClientId != clientId) {
            SetMailOverViewBoolean(null);
            SetMailOverViewClientId(null);
            SetMailObjsArray([]);

            await FetchConvo_Admin_Client(clientId);
        }


    }


    const FetchConvo_Admin_Client = async (SenderClientId) => {

        try {

            const response = await axios.get(`/GetAdmin/Convo/WithClient/${AdminId}/${SenderClientId}`);
            const ConversationMailArray = response.data;

            console.log(ConversationMailArray);

            SetMailOverViewBoolean(true);
            SetMailOverViewClientId(SenderClientId);
            SetMailObjsArray(ConversationMailArray);

        } catch (error) {
            throw error;
        }

    }



    const [viewProfile, setViewProfile] = useState(false)
    const handleViewProfile = () => {
        if (viewProfile) setViewProfile(false)
        else setViewProfile(true)
    }

    // redering return ng InboxComponent
    return (
        <>
            {/* <!-- inbox list/content container --> */}
            <div className="flex h-full px-5 pb-5 overflow-auto ">
                {viewProfile ? (
                    <div className="relative w-full overflow-hidden border border-darkColor">
                        <button className="absolute right-0 p-3 hover:text-red-600" onClick={handleViewProfile}>
                            <svg className="h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4" /></svg>
                        </button>
                        <div className="flex flex-col h-full p-5 overflow-auto px-7">
                            <h1 className="pb-5 text-4xl font-semibold text-center font-noto">User Name Profile </h1>
                            <div className="container mx-auto border rounded-md border-darkColor">
                                <table className="w-full border-collapse">
                                    <tr>
                                        <th className="h-full p-5 border-b border-r border-darkColor">ID</th>
                                        <td className="p-5 border-b border-darkColor">
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                            Distinctio, cupiditate? Consequuntur libero voluptatem quam a
                                            <input placeholder="Enter here" className="w-full p-3 mt-3 border rounded border-darkColor"></input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="h-full p-5 border-b border-r border-darkColor">
                                            Username
                                        </th>
                                        <td className="p-5 border-b border-darkColor">
                                            {/* {ClientData && `${ClientData[0].firstName}`} */}
                                            Asdd
                                            <input placeholder="Enter here" className="w-full p-3 mt-3 border rounded border-darkColor"></input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="h-full p-5 border-b border-r border-darkColor">Name</th>
                                        <td className="p-5 border-b border-darkColor">
                                            {/* {ClientData &&
                                                `${ClientData[0].firstName} ${ClientData[0].middleName} ${ClientData[0].Lastname}`} */}
                                            aksdgasd
                                            <input placeholder="Enter here" className="w-full p-3 mt-3 border rounded border-darkColor"></input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="h-full p-5 border-b border-r border-darkColor">Age</th>
                                        <td className="p-5 border-b border-darkColor">
                                            {/* {ClientData && `${ClientData[0].age}`} */}
                                            lajshdahd
                                            <input placeholder="Enter here" className="w-full p-3 mt-3 border rounded border-darkColor"></input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="h-full p-5 border-b border-r border-darkColor">Gender</th>
                                        <td className="p-5 border-b border-darkColor">
                                            {/* {ClientData && `${ClientData[0].gender}`} */}
                                            lasdkasd
                                            <input placeholder="Enter here" className="w-full p-3 mt-3 border rounded border-darkColor"></input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="h-full p-5 border-b border-r border-darkColor">
                                            Address
                                        </th>
                                        <td className="p-5 border-b border-darkColor">
                                            {/* {ClientData &&
                                                `${ClientData[0].houseno} ${ClientData[0].street} ${ClientData[0].barangay} ${ClientData[0].city} ${ClientData[0].district} ${ClientData[0].zipcode}`} */}
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem blanditiis nisi quo earum odit repudiandae dolores velit saepe quam autem?
                                            <input placeholder="Enter here" className="w-full p-3 mt-3 border rounded border-darkColor"></input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="h-full p-5 border-b border-r border-darkColor">City</th>
                                        <td className="p-5 border-b border-darkColor">
                                            {/* {ClientData && `${ClientData[0].city}`} */}
                                            ajnksdakjdha
                                            <input placeholder="Enter here" className="w-full p-3 mt-3 border rounded border-darkColor"></input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="h-full p-5 border-b border-r border-darkColor">
                                            District
                                        </th>
                                        <td className="p-5 border-b border-darkColor">
                                            {/* {ClientData && `${ClientData[0].district}`} */}
                                            aljkshdkashd
                                            <input placeholder="Enter here" className="w-full p-3 mt-3 border rounded border-darkColor"></input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="h-full p-5 border-b border-r border-darkColor">
                                            Contact No.
                                        </th>
                                        <td className="p-5 border-b border-darkColor">
                                            {/* {ClientData && `${ClientData[0].phone}`} */}
                                            pilay
                                            <input placeholder="Enter here" className="w-full p-3 mt-3 border rounded border-darkColor"></input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="h-full p-5 border-r border-darkColor">
                                            Member Status
                                        </th>
                                        <td className="p-5">
                                            {/* {ClientData && `${ClientData[0].status}`} */}
                                            pilay
                                            <input placeholder="Enter here" className="w-full p-3 mt-3 border rounded border-darkColor"></input>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col w-full overflow-hidden border border-l min-w-80 border-darkColor rounded-s">
                        <div className="flex justify-between w-full p-2 border-b border-darkColor bg-extra-extra-light">
                            <div className="flex gap-2">
                                <input type="checkbox" />
                                <label for="">Select All {InboxClientIds && InboxClientIds.length}</label>

                            </div>
                            <button className="hover:text-red-600">
                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                            </button>
                        </div>
                        <div className="pb-5 overflow-auto">

                            {InboxClientIds && InboxClientIds.map((clientId) => {
                                return (
                                    <MailListView clientId={clientId} ClickInboxAction={ClickInboxAction} ></MailListView>
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


                )}
                {MailOverViewBoolean && !viewProfile && (
                    <MailOverView MailObjsArray={MailObjsArray} ContactClientId={MailOverViewClientId} handleViewProfile={handleViewProfile} FetchConvo_Admin_Client={FetchConvo_Admin_Client}></MailOverView>
                )}

            </div>
        </>
    )
}



// component definition of the MailListView
const MailListView = ({ clientId, ClickInboxAction }) => {



    const { AdminId } = useContext(UserContext);
    const ClientIdReference = clientId;

    //logic here to fetch all of the mail conversation  of this ClientIdReferencea and this AdminId


    return (
        <>
            <div className="grid grid-cols-7 gap-4 p-2 border-b border-darkColor hoverMailItem group/del" onClick={() => { ClickInboxAction(ClientIdReference) }}>
                <label className="flex col-span-2 gap-2" htmlFor="">
                    <input type="checkbox" />
                    {/* <!-- from --> */}
                    <h6 className="truncate">firstName</h6>
                </label>
                {/* <!-- subject --> */}
                <h6 className="col-span-3 truncate">Subject</h6>
                <h6 className="col-span-2 my-auto text-xs justify-self-end group-hover/del:hidden">date sent and time sent</h6>
                <button className="hidden col-span-2 justify-self-end group-hover/del:inline hover:text-red-600">
                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                </button>
            </div>

        </>
    )
}


// component definition of the MailOverView
const MailOverView = ({ MailObjsArray, ContactClientId, handleViewProfile, FetchConvo_Admin_Client }) => {



    const Overflow_InnerInbox = useRef(null);
    const { AdminId } = useContext(UserContext);

    useEffect(() => {

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

    // const [viewProfile, setViewProfile] = useState(false)
    // const handleViewProfile = () => {
    //     if (viewProfile) setViewProfile(false)
    //     else setViewProfile(true)
    // }



    return (
        <>
            {/* <!-- mail content view --> */}
            {/* <!-- mail content view --> */}
            {/*  vin need ko dito ng div na pag lalagyan ng close button 
                pag nag clcick sa button mag disappear yung MailOverView
            */}
            <div ref={Overflow_InnerInbox} className="relative flex flex-col w-3/4 overflow-auto border-t border-b border-r border-darkColor">

                <div className="sticky top-0 z-10 w-full">
                    <div className="flex justify-between w-full p-2 border-b border-darkColor bg-extra-extra-light">
                        <div className="flex flex-row gap-2 px-2 rounded cursor-pointer hover:bg-extra-light" onClick={handleViewProfile}>
                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z" /></svg>
                            <p className="">User Name</p>
                        </div>
                        {/* <p className="">Subj</p> */}

                        {/* close btn */}
                        <button className="hover:text-red-600">
                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4" /></svg>
                        </button>
                    </div>
                </div>

                {MailObjsArray.map((MailObj) => {
                    // return(

                    //     //conditional logic here to determine the component to render for receiver and sender
                    //     //<MailInnerView MailObj={MailObj}></MailInnerView>
                    // )

                    if (MailObj.senderID == AdminId) {
                        return (
                            <MailInnerViewUserSender MailObj={MailObj}></MailInnerViewUserSender>
                        )
                    } else {
                        return (
                            <MailInnerView MailObj={MailObj}></MailInnerView>
                        )
                    }
                })}

                <div className="flex justify-around gap-5 px-5 my-2 font-medium lg:px-0">
                    {/* <button className="w-full py-2 border rounded border-darkColor scaleHover hover:bg-extra-light">Forward</button> */}
                    <button className="w-full lg:w-[80%] py-2 text-white rounded bg-primary-light scaleHover" onClick={() => { ReplyActivate() }}>Reply</button>

                </div>

                {/* {ReplyButtonState == true && <Replyform></Replyform>} */}
                <div className="h-auto">
                    {ReplyButtonState == true && <Replyform ContactClientId={ContactClientId} ReplyDeactivate={ReplyDeactivate} FetchConvo_Admin_Client={FetchConvo_Admin_Client}></Replyform>}

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



const Replyform = ({ ContactClientId, ReplyDeactivate, FetchConvo_Admin_Client }) => {

    const { AdminId } = useContext(UserContext);
    
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [files, setFiles] = useState([]);

    const handleReplyForm = async(event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('senderAdminId', AdminId);
        formData.append('receiverClientId', ContactClientId);
        formData.append('subject', subject);
        formData.append('message', message);

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
            
        }


        try{
            
            const response = await axios.post(`/sendMail/Admin`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(`status: ${response.data}`);
            //outside function here to complete this block
            ReplyDeactivate();
            FetchConvo_Admin_Client(ContactClientId);


        }catch(error){
            console.log('error from the handeReplyForm at the ReplyForm on tge Adminside', error);
            throw error;
        }



        console.log(subject);
        console.log(message);


    }

    const handleFileChange = (event) => {
        setFiles(event.target.files)
    }

    return (
        <>
            <div className="flex mx-auto w-full p-5 lg:w-[80%]">
                {/* <!-- form container --> */}
                <form id="replyForm" method='post' className="flex flex-col w-full gap-5 rounded" onSubmit={handleReplyForm}>
                    <div className="flex flex-wrap items-center w-full gap-2">
                        <h4 className="flex shrink" >To: {ContactClientId}</h4>
                        <input className="flex px-4 py-2 bg-white border rounded border-darkColor grow" type="hidden" value={ContactClientId} />

                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <label className="flex shrink" htmlFor="">Subject:</label>
                        <input className="flex min-w-full px-4 py-2 bg-white border rounded border-darkColor" type="text" value={subject} onChange={(e) => setSubject(e.target.value)}/>
                    </div>

                    {/* <!-- <label className="opacity-70" for="">To:</label> --> */}
                    <textarea className="w-full h-full min-h-[300px] px-4 py-2 bg-white border rounded border-darkColor" name="" id="" cols="30" rows="10" placeholder="Message goes here." value={message} onChange={(e) => setMessage(e.target.value)}></textarea>

                    <div className="flex items-center w-full mx-auto border rounded border-darkColor">
                        <input class="file:mr-4 w-full file:py-4 file:border-darkColor file:px-4 file:border-r file:border-l-0 file:border-t-0 file:border-b-0 file:font-medium file:bg-transparent file:text-primary-light hover:file:text-white hover:file:bg-primary-light" id="file" accept="image/*, .pdf, .doc, .docx, .txt" onChange={handleFileChange} type="file" multiple />
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