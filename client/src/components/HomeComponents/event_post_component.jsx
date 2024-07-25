import React, { useContext, useEffect, useState } from "react";
import { TimeUtils, ImageStringUtils } from '../../module-script/util';
import { HotPostUtils, isLessThanTwoDaysDifference, convertToMilliseconds, HotPostChecker } from '../../utils'
import { ClientUserContext } from "../../pages/ClientUserContext";
import { CodeGenerator } from "../../utils";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const EventPostComponent = ({ eventdata, RegistredBoolean, ReInvokeFetchRegistry, TimeNow_Event }) => {
  const { clientuserId } = useContext(ClientUserContext);

  // Initialize JoinedStatus based on RegistredBoolean prop
  const [JoinedStatus, SetJoinedStatus] = useState(RegistredBoolean);
  const [isModalOpen, setIsModalOpen] = useState(false)

  const JoinButtonAction = async () => {
    const thisEventId = eventdata.id;
    const thisUserId = clientuserId;
    const generatedCode = CodeGenerator.EventCodeGenerator(thisEventId, thisUserId);
    

    try {
      const response = await axios.post(`/UserRegister/Event`, { TicketCode: generatedCode });
      if (response.status >= 200 && response.status <= 299) {
        

        if(response.data.message == true){

          console.log(`message:`, response.data.message);
          SetJoinedStatus(true);
          setIsModalOpen(false); //closing the modal
          alert('ticket created');
          ReInvokeFetchRegistry();


        }else{
          alert('no ticket available right now');
          setIsModalOpen(false);
          ReInvokeFetchRegistry();

        }
      }
    } catch (error) {
      console.error("Error joining event:", error);
    }
  }

  const [ForDisabilities, SetForDisabilities] = useState([]);

  const Convert_strTargetGroupToArray = () => {

    const strTargetGroup = eventdata.target_group;
    SetForDisabilities(strTargetGroup.split(','));
  }

  const [ImageArray, SetImageArray] = useState([]);

  const ImageStringToArray = () => {
    const strImage = eventdata.imagefiles;
    const ArrayImage = strImage.split(',');

    SetImageArray(ArrayImage);

  }

  const [IsHot, SetIsHot] = useState(false);

  const verifyHotPost = () => {

    SetIsHot(HotPostChecker(`${eventdata.date_created} ${eventdata.time_created}`, `${TimeNow_Event.DateNow} ${TimeNow_Event.TimeNowFormatted}`));

  }


  useEffect(() => {
    SetJoinedStatus(RegistredBoolean);
    Convert_strTargetGroupToArray();
  }, [RegistredBoolean]);

  useEffect(() => {
    ImageStringToArray();
    verifyHotPost();
    
  }, [])

 

  return (
    <>
      {/* <!-- event post container --> */}
      <div className="flex flex-wrap gap-4 p-4 bg-gray-50 xl:flex-nowrap eventCard">
        {/* <!-- event info container --> */}
        <div className="flex flex-col w-full gap-4 text-center lg:text-start xl:w-1/2">
          {/* <!-- title --> */}
          {/* new badge here 
          
            pa modify ako ng New badge dito vin
          */}
          {IsHot && (<h3 className="text-red-600">New Post</h3>)}

          <h1 className="text-4xl font-semibold lg:text-6xl text-balance font-noto">{eventdata.event_title}</h1>
          {/* <h3>{isLessThanTwoDaysDifference("2024-7-25T11:24:24", "2024-07-25T14:52:03")}</h3> */}
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium lg:text-lg lg:justify-start">
            {/* <!-- date --> */}
            <h3 className="tagBG">Date: {eventdata.scheduled_date}</h3>
            {/* <!-- time --> */}
            <h3 className="tagBG">Time: {TimeUtils._24HrTo12hr(eventdata.scheduled_time)}</h3>
            {/* <!-- location --> */}
            <h3 className="tagBG">Location: {eventdata.location}</h3>
            {/* <!-- Ticket slots --> */}
            <h3 className="tagBG">Ticket slots: {eventdata.registered_tickets}/{eventdata.ticket_limit}</h3>
          </div>
          <p className="text-primary-light text-2xl">For members with the following disability:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium lg:text-lg lg:justify-start">
            {/* <!-- target group --> */}
            {ForDisabilities && ForDisabilities.map(disability => (
              <h3 className="tagBG">{disability}</h3>
            ))}
          </div>

          {/* <!-- desc --> */}
          <p className="pr-2 mt-4 overflow-auto text-justify max-h-52">{eventdata.description}</p>

          {
            JoinedStatus ? (
              //set condition here
              <button className="w-10/12 p-4 mx-auto mt-auto text-xl font-medium text-white bg-gray-400 rounded-md" disabled>
                Joined
              </button>
            ) : (
              //set condition here
              <button
                className="w-10/12 p-4 mx-auto mt-auto text-xl font-medium text-white rounded-md bg-primary-light scaleHover"
                onClick={() => { setIsModalOpen(true) }}
              >
                Join
              </button>
            )
          }

          {isModalOpen && (
            <div className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-60 backdrop-blur-sm">
              <div className="sm:w-[30%] mx-5 w-full sm:min-w-[400px] max-w-[500px] flex flex-col bg-white gap-7 z-[11] rounded-lg p-10 justify-center relative">
                <h1 className="text-3xl font-semibold text-center font-noto">Join Event</h1>
                <div className="w-[50%] mx-auto h-[0.5px] bg-darkColor"></div>
                <h3 className="mb-3 overflow-auto text-lg text-center font-noto">
                  Are you sure you want to join the event
                  <span className="block font-semibold">"{eventdata.event_title}"?</span>
                  Clicking "<span className="font-semibold">Yes</span>" will register you for this event.
                </h3>
                <div className="flex flex-wrap justify-center gap-5 mx-auto">

                  {/* yes btn */}
                  <button
                    className="px-5 py-2 text-lg text-white rounded scaleHover bg-primary-light"
                    onClick={JoinButtonAction}>Yes</button>

                  <button
                    className="px-5 py-2 text-lg text-red-600 border border-red-600 rounded hover:text-white hover:bg-red-600"
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
        {/* <!-- img container --> */}
        <div className="order-first w-full xl:w-1/2 xl:order-last">
          {/* <!-- id="smallImg" onclick="enlargeImg()" --> */}
          {/* <img className="object-cover w-full h-full rounded-md" src={require(`../../../../server/FileUpload/${ImageStringUtils.FirstImageElement(eventdata.imagefiles)}`)} alt="img" /> */}
          {/* Carousel component link */}
          {/* https://cloudinary.com/blog/add-a-responsive-image-carousel-to-your-react-app */}

          {ImageArray && ImageArray.map((filename) => {
            if(filename != ''){
              return (
                <>
                  <Carousel
                  useKeyboardArrows={true}
                  autoPlay={true}
                  infiniteLoop={true}
                  >
                    
                    <img className="object-cover w-full h-full rounded-md" alt="sample_file" src={filename} />
                    
                  </Carousel>  
            
                </>
              )
            }
          })}
        </div>
      </div>
    </>
  )
}

export default EventPostComponent;
