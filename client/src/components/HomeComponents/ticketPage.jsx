import React , {useEffect, useState, useContext}from 'react';
import { ClientUserContext } from '../../pages/ClientUserContext';
import axios from 'axios';

const TicketPage = ({ }) => {
  
  // const [event_regsitered, SetEvent_registered] = useState(event_registry);
  // const [job_registered, SetJob_registered] = useState(job_registry);

  // useEffect(() => {
  //   SetEvent_registered(event_registry);
  // }, [event_registry]);

  // useEffect(() => {
  //   SetJob_registered(job_registry);
  // }, [job_registry]);

  const { clientuserId } = useContext(ClientUserContext);


  const [EventRegistryObjArray, SetEventRegistryObjArray] = useState([]);

  const [JobRegistryObjArray, SetJobRegistryObjArray] = useState([]);

  //make a function to retrived all the registered event and job using the userId
  const FetchRegistry = async() => {

    try{

      const response = await axios.get(`ExtractRegistry/Object/${clientuserId}`);
      const RegistryObject = response.data;
      
      //logging the RegistryObject for debugging
      console.log(RegistryObject);


      //Assiging the respective array to it's useState variable
      //EventRegistry
      SetEventRegistryObjArray(RegistryObject.eventInnerJoinPost);

      //JobRegistry
      SetJobRegistryObjArray(RegistryObject.jobInnerJoinPost);
      

    }catch(error){
      throw error;
    }
  }
  

  //execute after the initial render
  useEffect(() => {

    FetchRegistry();

  }, []);



 return (
    <>
      <h1 className='flex justify-center flex-grow text-2xl'>No Tickets Yet... {clientuserId}</h1>

      {/* Event Card */}
      

      {EventRegistryObjArray && EventRegistryObjArray.map((eventRegistryObj) => {
        return (
          <EventTicketCard dataObj={eventRegistryObj}></EventTicketCard>
        )
      })}

      {/* Job Card */}
      {JobRegistryObjArray && JobRegistryObjArray.map((jobRegistryObj) => {
        return (
          <JobTicketCard dataObj={jobRegistryObj}></JobTicketCard>
        )
      })}
      
    </>
  )
  
}

export default TicketPage

const EventTicketCard = ({dataObj}) => {

  return (
    <>
      <div className="flex flex-wrap gap-4 p-4 border-2 border-dashed rounded-lg border-primary-light">
        <div className="flex flex-col flex-wrap flex-grow gap-4 md:flex-row">
          < div className="flex flex-col items-center w-full gap-2 p-5 text-center bg-gray-50 eventCard" >

            {/* post type */}
            <h1 className="px-2 mb-2 text-lg font-medium border-b lg:text-2xl border-darkColor" >{dataObj.registration_code}</h1 >

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
          Event Ticket
          {/* <button className='px-6 py-2 text-white rounded bg-gradient-dark-to scaleHover'>Print</button> */}
        </div>
      </div>
    </>
  )
}


const JobTicketCard = ({dataObj}) => {

  return (
    <>
      <div className="flex flex-wrap gap-4 p-4 border-2 border-dashed rounded-lg border-primary-light">
        <div className="flex flex-col flex-wrap flex-grow gap-4 md:flex-row">
          < div className="flex flex-col items-center w-full gap-2 p-5 text-center bg-gray-50 eventCard" >
            {/* post type */}
            <h1 className="px-2 mb-2 text-lg font-medium border-b lg:text-2xl border-darkColor" >{dataObj.registration_code}</h1 >

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
          Job Ticket
          {/* <button className='px-6 py-2 text-white rounded bg-gradient-dark-to scaleHover'>Print</button> */}
        </div>
      </div>
    </>
  )
}