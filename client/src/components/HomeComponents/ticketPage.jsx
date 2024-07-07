import React, { useEffect, useState } from 'react'

const TicketPage = ({ }) => {

  const [isEventsTicketActive, setIsEventsTicketActive] = useState(true)

  return (
    <>
      <div className="flex flex-row w-full overflow-hidden text-xl border rounded border-darkColor bg-extra-extra-light">
        <button className={`w-full px-5 py-2 ${isEventsTicketActive ? 'activeMail' : 'hoverMail'}`} onClick={() => { if (!isEventsTicketActive) setIsEventsTicketActive(true) }}>Events Ticket</button>
        <button className={`w-full px-5 py-2 ${!isEventsTicketActive ? 'activeMail' : 'hoverMail'}`} onClick={() => { if (isEventsTicketActive) setIsEventsTicketActive(false) }}>Jobs Ticket</button>
      </div>

      {/* <h1 className='flex justify-center flex-grow text-2xl'>No Tickets Yet...</h1> */}

      {isEventsTicketActive ? (
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
      ) : (
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
      )

      }




    </>
  )
}
export default TicketPage
//   {/* <!-- title --> */ }
// </div >
