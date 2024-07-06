import React , {useEffect, useStatem, useContext}from 'react'
import { ClientUserContext } from '../../pages/ClientUserContext'
import axios from 'axios'
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


  //make a function to retrived all the registered event and job using the userId

  


  return (
    <>
      <h1 className='flex justify-center flex-grow text-2xl'>No Tickets Yet... {clientuserId}</h1>

      <div className="flex flex-wrap gap-4 p-4 border-2 border-dashed rounded-lg border-primary-light">
        <div className="flex flex-col flex-wrap flex-grow gap-4 md:flex-row">
          < div className="flex flex-col items-center w-full gap-2 p-5 text-center bg-gray-50 eventCard" >

            {/* post type */}
            <h1 className="px-2 mb-2 text-lg font-medium border-b lg:text-2xl border-darkColor" >Event Ticket</h1 >

            {/* title */}
            <h1 className="w-full text-2xl font-semibold lg:text-4xl text-balance font-noto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, numquam?</h1>
          </div>

          {/* date */}
          <div className="flex items-center justify-center flex-grow gap-2 p-5 text-lg font-medium lg:text-2xl eventCard bg-gray-50">00/00/0000</div>

          {/* <!-- time --> */}
          <div className="flex items-center justify-center flex-grow gap-2 p-5 text-lg font-medium lg:text-2xl eventCard bg-gray-50">00:00:00</div>

          {/* <!-- location --> */}
          <div className="flex items-center justify-center flex-grow gap-2 p-5 text-lg font-medium text-center lg:text-2xl eventCard bg-gray-50">Location</div>

        </div>
        <div className='flex items-center justify-end w-full gap-2 text-gray-500'>
          Ticket 01
          {/* <button className='px-6 py-2 text-white rounded bg-gradient-dark-to scaleHover'>Print</button> */}
        </div>
      </div>

      {/* sample */}
      <div className="flex flex-wrap gap-4 p-4 border-2 border-dashed rounded-lg border-primary-light">
        <div className="flex flex-col flex-wrap flex-grow gap-4 md:flex-row">
          < div className="flex flex-col items-center w-full gap-2 p-5 text-center bg-gray-50 eventCard" >
            {/* post type */}
            <h1 className="px-2 mb-2 text-lg font-medium border-b lg:text-2xl border-darkColor" >Job Ticket</h1 >

            {/* title */}
            <h1 className="w-full text-2xl font-semibold lg:text-4xl text-balance font-noto">Sample Title</h1>
          </div>

          {/* <!-- date --> */}
          <div className="flex items-center justify-center flex-grow gap-2 p-5 text-lg font-medium lg:text-2xl eventCard bg-gray-50">00/00/0000</div>

          {/* <!-- time --> */}
          <div className="flex items-center justify-center flex-grow gap-2 p-5 text-lg font-medium lg:text-2xl eventCard bg-gray-50">00:00:00</div>

          {/* <!-- location --> */}
          <div className="flex items-center justify-center flex-grow gap-2 p-5 text-lg font-medium text-center lg:text-2xl eventCard bg-gray-50">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, a?</div>
        </div>

        <div className='flex items-center justify-end w-full gap-2 text-gray-500'>
          Ticket 01
          {/* <button className='px-6 py-2 text-white rounded bg-gradient-dark-to scaleHover'>Print</button> */}
        </div>
      </div>
    </>
  )
}
export default TicketPage
//   {/* <!-- title --> */ }
// </div >
