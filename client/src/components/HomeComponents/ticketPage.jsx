import React, { useEffect, useState, useContext } from 'react';
import { ClientUserContext } from '../../pages/ClientUserContext';
import axios from 'axios';

const TicketPage = ({ }) => {
  const { clientuserId } = useContext(ClientUserContext);
  const [EventRegistryObjArray, SetEventRegistryObjArray] = useState([]);
  const [JobRegistryObjArray, SetJobRegistryObjArray] = useState([]);
  const [isEventsTicketActive, setIsEventsTicketActive] = useState(true);

  //make a function to retrived all the registered event and job using the userId
  const FetchRegistry = async () => {
    try {
      const response = await axios.get(`ExtractRegistry/Object/${clientuserId}`);
      const RegistryObject = response.data;

      //logging the RegistryObject for debugging
      console.log(RegistryObject);

      //Assiging the respective array to it's useState variable
      //EventRegistry
      SetEventRegistryObjArray(RegistryObject.eventInnerJoinPost);
      //JobRegistry
      SetJobRegistryObjArray(RegistryObject.jobInnerJoinPost);
    } catch (error) {
      throw error;
    }
  }

  //execute after the initial render
  useEffect(() => {
    FetchRegistry();
  }, []);

  return (
    <>
      <div className="flex flex-row w-full text-xl border rounded border-darkColor bg-extra-extra-light">
        <button className={`w-full px-5 py-2 rounded-l ${isEventsTicketActive ? 'activeMail' : 'hoverMail'}`} onClick={() => { if (!isEventsTicketActive) setIsEventsTicketActive(true) }}>Events Ticket</button>
        <button className={`w-full px-5 py-2 rounded-r ${!isEventsTicketActive ? 'activeMail' : 'hoverMail'}`} onClick={() => { if (isEventsTicketActive) setIsEventsTicketActive(false) }}>Jobs Ticket</button>
      </div>

      {isEventsTicketActive ? (
        <div>
          {EventRegistryObjArray && EventRegistryObjArray.map((eventRegistryObj) => (
            <EventTicketCard key={eventRegistryObj.registration_code} dataObj={eventRegistryObj}></EventTicketCard>
          ))}
        </div>
      ) : (
        <div>
          {JobRegistryObjArray && JobRegistryObjArray.map((jobRegistryObj) => (
            <JobTicketCard key={jobRegistryObj.registration_code} dataObj={jobRegistryObj}></JobTicketCard>
          ))}
        </div>
      )}
    </>
  )
}

export default TicketPage

const EventTicketCard = ({ dataObj }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="flex flex-wrap gap-4 p-4 mb-5 border-2 border-dashed rounded-lg border-primary-light">
        <div className="flex flex-col flex-wrap flex-grow gap-4 md:flex-row">
          <h1 className='mx-auto'>Event Ticket</h1>
          <div className="flex flex-col items-center w-full gap-2 p-5 text-center bg-gray-50 eventCard">
            {/* post type */}
            <h1 className="px-2 mb-2 text-lg font-medium border-b lg:text-2xl border-darkColor">{dataObj.registration_code}</h1>
            {/* title */}
            <h1 className="w-full text-2xl font-semibold lg:text-4xl text-balance font-noto">{dataObj.event_title}</h1>
          </div>
          {/* date */}
          <div className="flex items-center justify-center flex-grow gap-2 p-5 text-lg font-medium lg:text-2xl eventCard bg-gray-50">{dataObj.scheduled_date}</div>
          {/* <!-- time --> */}
          <div className="flex items-center justify-center flex-grow gap-2 p-5 text-lg font-medium lg:text-2xl eventCard bg-gray-50">{dataObj.scheduled_time}</div>
          {/* <!-- location --> */}
          <div className="flex items-center justify-center flex-grow gap-2 p-5 text-lg font-medium text-center lg:text-2xl eventCard bg-gray-50">Location: {dataObj.location}</div>
        </div>
        <div className='flex items-center justify-end w-full gap-2 text-gray-500'>
          {/* <button className='px-6 py-2 text-white rounded bg-gradient-dark-to scaleHover'>Print</button> */}
          <button
            className='px-6 py-2 text-white bg-red-600 rounded scaleHover'
            onClick={() => { setIsModalOpen(true) }}
          >Cancel</button>
        </div>

        {isModalOpen && (
          <div className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-60 backdrop-blur-sm">
            <div className="sm:w-[30%] mx-5 w-full sm:min-w-[400px] max-w-[500px] flex flex-col bg-white gap-7 z-[11] rounded-lg p-10 justify-center relative">
              <svg className='h-10 text-red-600' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M1 21h22L12 2zm12-3h-2v-2h2zm0-4h-2v-4h2z" /></svg>
              <h1 className="text-3xl font-semibold text-center font-noto">Cancel Ticket</h1>
              <div className="w-[50%] mx-auto h-[0.5px] bg-darkColor"></div>
              <h3 className="mb-3 overflow-auto text-lg text-center font-noto">
                Are you sure you want to cancel your ticket for this event
                <span className="block font-semibold">"{dataObj.event_title}"?</span>
                Clicking "<span className="font-semibold">Yes</span>"will cancel your registration.
              </h3>
              <div className="flex flex-wrap justify-center gap-5 mx-auto">
                <button
                  className="px-5 py-2 text-lg text-white bg-red-600 rounded scaleHover"
                // onClick={}
                >Yes</button>
                <button
                  className="px-5 py-2 text-lg text-gray-600 border border-gray-600 rounded hover:text-white hover:bg-gray-600"
                  onClick={() => { setIsModalOpen(false) }}>Cancel</button>
              </div>
              <button className="absolute top-5 right-5 hover:text-red-600" onClick={() => { setIsModalOpen(false) }}>
                <svg className="h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4" /></svg>
              </button>
            </div>
            <button className="absolute z-10 w-full h-full cursor-default" onClick={() => { setIsModalOpen(false) }}></button>
          </div>
        )}
      </div>
    </>
  )
}

const JobTicketCard = ({ dataObj }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="flex flex-wrap gap-4 p-4 mb-5 border-2 border-dashed rounded-lg border-primary-light">
        <div className="flex flex-col flex-wrap flex-grow gap-4 md:flex-row">
          <h1 className='mx-auto'>Job Ticket</h1>
          <div className="flex flex-col items-center w-full gap-2 p-5 text-center bg-gray-50 eventCard">
            {/* post type */}
            <h1 className="px-2 mb-2 text-lg font-medium border-b lg:text-2xl border-darkColor">{dataObj.registration_code}</h1>
            {/* title */}
            <h1 className="w-full text-2xl font-semibold lg:text-4xl text-balance font-noto">{dataObj.event_title}</h1>
          </div>
          {/* <!-- date --> */}
          <div className="flex items-center justify-center flex-grow gap-2 p-5 text-lg font-medium lg:text-2xl eventCard bg-gray-50">{dataObj.scheduled_date}</div>
          {/* <!-- time --> */}
          <div className="flex items-center justify-center flex-grow gap-2 p-5 text-lg font-medium lg:text-2xl eventCard bg-gray-50">{dataObj.scheduled_time}</div>
          {/* <!-- location --> */}
          <div className="flex items-center justify-center flex-grow gap-2 p-5 text-lg font-medium text-center lg:text-2xl eventCard bg-gray-50">{dataObj.description}</div>
        </div>
        <div className='flex items-center justify-end w-full gap-2 text-gray-500'>
          {/* <button className='px-6 py-2 text-white rounded bg-gradient-dark-to scaleHover'>Print</button> */}
          <button
            className='px-6 py-2 text-white bg-red-600 rounded scaleHover'
            onClick={() => { setIsModalOpen(true) }}
          >Cancel</button>
        </div>

        {isModalOpen && (
          <div className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-60 backdrop-blur-sm">
            <div className="sm:w-[30%] mx-5 w-full sm:min-w-[400px] max-w-[500px] flex flex-col bg-white gap-7 z-[11] rounded-lg p-10 justify-center relative">
              <svg className='h-10 text-red-600' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M1 21h22L12 2zm12-3h-2v-2h2zm0-4h-2v-4h2z" /></svg>
              <h1 className="text-3xl font-semibold text-center font-noto">Cancel Ticket</h1>
              <div className="w-[50%] mx-auto h-[0.5px] bg-darkColor"></div>
              <h3 className="mb-3 overflow-auto text-lg text-center font-noto">
                Are you sure you want to cancel your ticket for this job
                <span className="block font-semibold">"{dataObj.event_title}"?</span>
                Clicking "<span className="font-semibold">Yes</span>"will cancel your registration.
              </h3>
              <div className="flex flex-wrap justify-center gap-5 mx-auto">

                {/* yes btn */}
                <button
                  className="px-5 py-2 text-lg text-white bg-red-600 rounded scaleHover"
                // onClick={}
                >Yes</button>

                <button
                  className="px-5 py-2 text-lg text-gray-600 border border-gray-600 rounded hover:text-white hover:bg-gray-600"
                  onClick={() => { setIsModalOpen(false) }}>Cancel</button>
              </div>
              <button className="absolute top-5 right-5 hover:text-red-600" onClick={() => { setIsModalOpen(false) }}>
                <svg className="h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4" /></svg>
              </button>
            </div>
            <button className="absolute z-10 w-full h-full cursor-default" onClick={() => { setIsModalOpen(false) }}></button>
          </div>
        )}

      </div>
    </>
  )
}
