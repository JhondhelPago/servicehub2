import React from "react";
import { useState, useEffect, useContext , useRef} from "react";
import { UserContext } from "../LoginComponents/UserContext";
import axios from "axios";

const InboxComponent = () => {


    const { AdminId } = useContext(UserContext); // 0. AdminId useContext ang laman is yung AdminId netong loginSession

    const [InboxClientIds, SetInboxClientIds] = useState([]);


    const FetchInboxClientIds = async() => {
        
        try{

            const response = await axios.get(`FetchMailInbox/Admin/${AdminId}`);
            const ClientIds = response.data;
            SetInboxClientIds(ClientIds);
            
            

        }catch(error){
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


    const ClickInboxAction = async(clientId) => {

        await FetchConvo_Admin_Client(clientId);


        if(MailOverViewClientId != clientId){
            SetMailOverViewBoolean(null);
            SetMailOverViewClientId(null);
            SetMailObjsArray([]);

            await FetchConvo_Admin_Client(clientId);
        }

    
    }


    const FetchConvo_Admin_Client = async(SenderClientId) => {
    
        try{

            const response = await axios.get(`/GetAdmin/Convo/WithClient/${AdminId}/${SenderClientId}`);
            const ConversationMailArray = response.data;

            console.log(ConversationMailArray);
            
            SetMailOverViewBoolean(true);
            SetMailOverViewClientId(SenderClientId);
            SetMailObjsArray(ConversationMailArray);

        }catch(error){
            throw error;
        }
        
    }




    




    // redering return ng InboxComponent
    return (
        <>
            {/* <!-- inbox list/content container --> */}
            <div className="flex h-full px-5 pb-5 overflow-auto rounded">
                {/* <!-- mail list container --> */}
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
                    {/* <!-- mail items container --> */}
                    <div className="pb-5 overflow-auto">

                        {InboxClientIds && InboxClientIds.map((clientId) => {
                            return (
                                <MailListView clientId={clientId} ClickInboxAction={ClickInboxAction}></MailListView>
                            )
                        }) }
                        
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
                    <MailOverView MailObjsArray={MailObjsArray} ContactClientId={MailOverViewClientId}></MailOverView>
                )}
            </div>
        </>
    )
}



// component definition of the MailListView
const MailListView = ({clientId, ClickInboxAction}) => {

    const { AdminId } = useContext(UserContext);
    const ClientIdReference = clientId;

    //logic here to fetch all of the mail conversation  of this ClientIdReferencea and this AdminId


    return (
        <>
            <div className="grid grid-cols-7 gap-4 p-2 border-b border-darkColor hoverMailItem group/del" onClick={() => {ClickInboxAction(ClientIdReference)}}>
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
const MailOverView = ({MailObjsArray, ContactClientId}) => {

    const Overflow_InnerInbox = useRef(null);
    const { AdminId } = useContext(UserContext);

    useEffect(() => {

        if(Overflow_InnerInbox.current){
            Overflow_InnerInbox.current.scrollTop = Overflow_InnerInbox.current.scrollHeight;
        }

    }, [])




    const [ReplyButtonState, SetReplyButtonState] = useState(false);

    const ReplyActivate = () => {
        SetReplyButtonState(true);
    }

    return(
        <>
            {/* <!-- mail content view --> */}
            {/* <!-- mail content view --> */}
            {/*  vin need ko dito ng div na pag lalagyan ng close button 
                pag nag clcick sa button mag disappear yung MailOverView
            */}
            <div ref={Overflow_InnerInbox} className="w-3/4 flex flex-col border border-darkColor rounded-e overflow-y-auto">

                {MailObjsArray.map((MailObj) => {
                    // return(

                    //     //conditional logic here to determine the component to render for receiver and sender
                    //     //<MailInnerView MailObj={MailObj}></MailInnerView>
                    // )

                    if(MailObj.senderID == AdminId){
                        return(
                            <MailInnerViewUserSender MailObj={MailObj}></MailInnerViewUserSender>
                        )
                    }else{
                        return(
                            <MailInnerView MailObj={MailObj}></MailInnerView>
                        )
                    }
                })}

                <div className="px-5 flex gap-5 justify-around font-medium mb-2">
                    {/* <button className="py-2 w-full border border-darkColor rounded scaleHover hover:bg-extra-light">Forward</button> */}
                    <button className="py-2 w-full rounded text-white bg-primary-light scaleHover" onClick={() => {ReplyActivate()}}>Reply</button>
                    
                </div>

                {/* {ReplyButtonState == true && <Replyform></Replyform>} */}
                <div className="h-auto">
                    {ReplyButtonState == true && <Replyform ContactClientId={ContactClientId}></Replyform>}                    

                </div>
            </div>
        </>
    )

}

const MailInnerView = ({MailObj}) => {
    return(
        <>
             <div className='m-2 border-4 border-gray-300  rounded-lg'>
                <div className="p-4 flex flex-col gap-1 bg-extra-light rounded-tr" id="takenHeight">
                        <h3 className="text-xl md:text-center font-medium break-words">{MailObj.subject}</h3>
                        <div className="flex flex-row justify-center">
                            <div className="mr-44">
                                <div className="flex flex-col md:flex-row gap-1 justify-between">
                                    <h5 className="font-light md:order-last"></h5>
                                    <h4 className="font-light">From: <span className="font-medium">{MailObj.senderID}</span></h4>
                                </div>
                                <div className="flex flex-col md:flex-row gap-1 justify-between">
                                    <h5 className="font-light md:order-last"></h5>
                                    <h4 className="font-light">To: <span className="font-medium">{MailObj.receiverID}</span></h4>
                                </div>
                            </div>
                            
                            <div>
                                <div>
                                    <h5 className="font-light md:order-last"></h5>
                                    <h4 className="font-light">date <span className="font-medium">00/00/00</span></h4>
                                </div>
                                <div>
                                <h5 className="font-light md:order-last"></h5>
                                <h4 className="font-light">time <span className="font-medium">00:00</span></h4>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* <!-- body --> */}
                    <div className="p-4 flex flex-col gap-6 overflow-auto relative" id="remainingHeight">
                        {MailObj.body}
                    
                    </div>
             </div>
        </>
    )
}

const MailInnerViewUserSender = ({MailObj}) => {
    return(
        <>
             <div className='m-2 border-4 border-gray-300  rounded-lg'>
             <div className="p-4 flex flex-col gap-1 bg-extra-extra-light rounded-tr" id="takenHeight">
                        <h3 className="text-xl md:text-center font-medium break-words">{MailObj.subject}</h3>
                        <div className="flex flex-row justify-center">
                            <div className="mr-44">
                                <div className="flex flex-col md:flex-row gap-1 justify-between">
                                    <h5 className="font-light md:order-last"></h5>
                                    <h4 className="font-light">From: <span className="font-medium">{MailObj.senderID}</span></h4>
                                </div>
                                <div className="flex flex-col md:flex-row gap-1 justify-between">
                                    <h5 className="font-light md:order-last"></h5>
                                    <h4 className="font-light">To: <span className="font-medium">{MailObj.receiverID}</span></h4>
                                </div>
                            </div>
                            
                            <div>
                                <div>
                                    <h5 className="font-light md:order-last"></h5>
                                    <h4 className="font-light">date <span className="font-medium">00/00/00</span></h4>
                                </div>
                                <div>
                                <h5 className="font-light md:order-last"></h5>
                                <h4 className="font-light">time <span className="font-medium">00:00</span></h4>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* <!-- body --> */}
                    <div className="p-4 flex flex-col gap-6 overflow-auto relative" id="remainingHeight">
                        {MailObj.body}
                    
                    </div>
             </div>
        </>
    )

}



const Replyform = ({ContactClientId}) => {
    

    return(
        <>
         <div className="flex justify-center px-5 pb-5 overflow-auto rounded">
            {/* <!-- form container --> */}
            <form method='post' className="flex flex-col w-full gap-5 py-2 rounded lg:w-[80%]">
            <div className="flex items-center w-full gap-4">
                <h4 className="w-16 pl-2" >To: {ContactClientId}</h4>
                <input className="px-4 py-2 bg-white border rounded border-darkColor grow" type="hidden" value={ContactClientId} />
                
            </div>
            <div className="flex items-center w-full gap-4">
                <label className="w-16 pl-2" htmlFor="">Subject:</label>
                <input className="px-4 py-2 bg-white border rounded border-darkColor grow" type="text" />
            </div>

            {/* <!-- <label className="opacity-70" for="">To:</label> --> */}
            <textarea className="w-full h-full min-h-[300px] px-4 py-2 bg-white border rounded border-darkColor" name="" id="" cols="30" rows="10"  placeholder="Message goes here."></textarea>

            <div className="flex items-center w-full mx-auto border rounded border-darkColor">
                <input class="file:mr-4 w-full file:py-4 file:border-darkColor file:px-4 file:border-r file:border-l-0 file:border-t-0 file:border-b-0 file:font-medium file:bg-transparent file:text-primary-light hover:file:text-white hover:file:bg-primary-light" id="" type="file" multiple />
            </div>

            <div className="w-2/6 mx-auto text-center">
                <button type="submit" className="w-full py-2 text-white rounded bg-primary-light scaleHover" >Send</button>
            </div>
            </form>
        </div>
        
        </>
    )
}


export default InboxComponent;