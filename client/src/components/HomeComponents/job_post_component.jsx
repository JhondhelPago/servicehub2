import React, { useContext, useEffect, useState } from "react";
import { TimeUtils, ImageStringUtils } from "../../module-script/util";
import { ClientUserContext } from "../../pages/ClientUserContext";
import { CodeGenerator } from "../../utils";
import axios from "axios";
import sample_img from '../../assets/sample_img.jpg';
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { UNSAFE_DataRouterStateContext } from "react-router-dom";

const JobPostComponent = ({ jobdata, RegisteredBoolean, ReInvokeFetchRegistry }) => {

  const { clientuserId } = useContext(ClientUserContext);

  const [JoinedStatus, SetJoinedStatus] = useState(RegisteredBoolean);
  const [isModalOpen, setIsModalOpen] = useState(false)


  const JoinButtonAction = async () => {

    const thisJobId = jobdata.id;
    const thisUserId = clientuserId;
    const generatedCode = CodeGenerator.EventCodeGenerator(thisJobId, thisUserId);
    ;

    try {

      const response = await axios.post(`/UserRegister/Job`, { TicketCode: generatedCode });
      if (response.status >= 200 && response.status <= 299) {

        if(response.data.message == true){

        SetJoinedStatus(true);
        setIsModalOpen(false); // closing the modal
        alert('ticket created.')
        ReInvokeFetchRegistry();
        }else{
          alert('no ticket available right now');
          setIsModalOpen(false);
          ReInvokeFetchRegistry();
        }
      }
    } catch (error) {
      throw error;
    }


  }

  const [ForDisabilities, SetForDisabilities] = useState([]);

  const Convert_strTargetGroupToArray = () => {

    const strTargetGroup = jobdata.target_group;
    SetForDisabilities(strTargetGroup.split(','));
  }

  const [ImageArray, SetImageArray] = useState([]);

  const ImageStringToArray = () => {
    const strImage = jobdata.imagefiles;
    const strImageArray = strImage.split(',');;

    SetImageArray(strImageArray);

  }

  useEffect(() => {
    SetJoinedStatus(RegisteredBoolean);
    Convert_strTargetGroupToArray();
  }, [RegisteredBoolean]);

  useEffect(() => {
    ImageStringToArray();
  }, [])

  return (
    <>
      {/* <!-- event post container --> */}
      {/* <div>
        <h2 className="text-2xl font-bold">Seek your Job</h2>
      </div> */}
      <div className="flex flex-wrap gap-4 p-4 bg-gray-50 xl:flex-nowrap eventCard">
        {/* <!-- event info container --> */}
        <div className="flex flex-col w-full gap-4 text-center lg:text-start xl:w-1/2">
          {/* <!-- title --> */}
          <h1 className="text-4xl font-semibold lg:text-6xl text-balance font-noto">{jobdata.event_title}</h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium lg:text-lg lg:justify-start">
            {/* <!-- date --> */}
            <h3 className="tagBG">{jobdata.scheduled_date}</h3>
            {/* <!-- time --> */}
            <h3 className="tagBG">{TimeUtils._24HrTo12hr(jobdata.scheduled_time)}</h3>
            {/* <!-- location --> */}
            <h3 className="tagBG">{jobdata.location}</h3>
            {/* <!-- Ticket slots --> */}
            <h3 className="tagBG">Ticket slots: {jobdata.registered_tickets}/{jobdata.ticket_limit}</h3>
          </div>
          <p className="text-primary-light text-2xl">For members with the following disability:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium lg:text-lg lg:justify-start">
            {/* <!-- target group --> */}
            {ForDisabilities && ForDisabilities.map(disability => (
              <h3 className="tagBG">{disability}</h3>
            ))}
          </div>
          {/* <!-- desc --> */}
          <p className="px-2 mt-4 overflow-auto text-justify max-h-52">{jobdata.description}</p>
          {
            JoinedStatus ? (
              <button className="w-10/12 p-4 mx-auto mt-auto text-xl font-medium text-white bg-gray-400 rounded-md" disabled>
                Joined
              </button>
            ) : (
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
                <h1 className="text-3xl font-semibold text-center font-noto">Join Job</h1>
                <div className="w-[50%] mx-auto h-[0.5px] bg-darkColor"></div>
                <h3 className="mb-3 overflow-auto text-lg text-center font-noto">
                  Are you sure you want to join the job
                  <span className="block font-semibold">"{jobdata.event_title}"?</span>
                  Clicking "<span className="font-semibold">Yes</span>" will register you for this job.
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
          {/* <img className="object-cover w-full h-full rounded-md" src={require(`../../../../server/FileUpload/${ImageStringUtils.FirstImageElement(jobdata.imagefiles)}`)} alt="img" /> */}

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

export default JobPostComponent;