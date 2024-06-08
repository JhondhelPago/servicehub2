import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { ClientUserContext } from "../../pages/ClientUserContext";


const InboxComponent = () => {

    const { clientuserId } = useContext(ClientUserContext);

    const [InboxArray, SetInboxArray] = useState([]);

    //function to fetch the inbox of the clientuser using the clientuserId


    const FetchMailInbox = async () => {

        try {

            const response = await axios.get(`/FetchMailInbox/Client/${clientuserId}`);
            const InboxArraydata = response.data;
            SetInboxArray(InboxArraydata);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }



    useEffect(() => {

        FetchMailInbox();

    }, [])



    const [MailOverViewObj, SetMailOverViewObj] = useState(null);


    const placeMailOverViewObj = (MailObj) => {
        SetMailOverViewObj(MailObj);
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
                            <label for="">Select All {InboxArray.length}</label>

                        </div>
                        <button className="hover:text-red-600">
                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                        </button>
                    </div>
                    {/* <!-- mail items container --> */}
                    <div className="h-full pb-5 overflow-auto">




                        {InboxArray.map((Inbox) => {
                            return (
                                <MailListView MailObj={Inbox} ListMailClick={placeMailOverViewObj}></MailListView>
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
                {MailOverViewObj && (
                    <MailOverView MailInfo={MailOverViewObj}></MailOverView>
                )}
            </div>
        </>
    )
}



// component definition of the MailListView
const MailListView = ({ MailObj, ListMailClick }) => {



    return (
        <>
            <div className="grid grid-cols-7 gap-4 p-2 border-b border-darkColor hoverMailItem group/del" onClick={() => { ListMailClick(MailObj) }}>
                <label className="flex col-span-2 gap-2" htmlFor="">
                    <input type="checkbox" />
                    {/* <!-- from --> */}
                    <h6 className="truncate">{MailObj.firstName}</h6>
                </label>
                {/* <!-- subject --> */}
                <h6 className="col-span-3 truncate">{MailObj.subject}</h6>
                <h6 className="col-span-2 my-auto text-xs justify-self-end group-hover/del:hidden">{`${MailObj.date_sent} ${MailObj.time_sent}`}</h6>
                <button className="hidden col-span-2 justify-self-end group-hover/del:inline hover:text-red-600">
                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                </button>
            </div>

        </>
    )
}


// component definition of the MailOverView
const MailOverView = ({ MailInfo }) => {

    return (
        <>
            {/* <!-- mail content view --> */}
            <div className="flex flex-col w-3/4 border-t border-b border-r border-darkColor rounded-e">
                <div className="flex flex-col gap-1 p-4 rounded-tr bg-extra-extra-light" id="takenHeight">
                    <h3 className="text-xl font-medium break-words md:text-center">{MailInfo.subject}</h3>
                    <div className="flex flex-col justify-between gap-1 md:flex-row">
                        <h5 className="font-light md:order-last"></h5>
                        <h4 className="font-light">From: <span className="font-medium">{MailInfo.senderID}</span></h4>
                    </div>
                    <div className="flex flex-col justify-between gap-1 md:flex-row">
                        <h5 className="font-light md:order-last"></h5>
                        <h4 className="font-light">To: <span className="font-medium">{MailInfo.receiverID}</span></h4>
                    </div>
                </div>
                {/* <!-- body --> */}
                <div className="relative flex flex-col gap-6 p-4 overflow-auto" id="remainingHeight">
                    {MailInfo.body}
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
