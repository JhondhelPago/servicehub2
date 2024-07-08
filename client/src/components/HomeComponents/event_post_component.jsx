import React, { useContext, useEffect, useState } from "react";
import { TimeUtils, ImageStringUtils } from '../../module-script/util';
import { ClientUserContext } from "../../pages/ClientUserContext";
import { CodeGenerator } from "../../utils";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const EventPostComponent = ({ eventdata, RegistredBoolean, ReInvokeFetchRegistry }) => {

  const { clientuserId } = useContext(ClientUserContext);

  // Initialize JoinedStatus based on RegistredBoolean prop
  const [JoinedStatus, SetJoinedStatus] = useState(RegistredBoolean);

  const JoinButtonAction = async () => {
    const thisEventId = eventdata.id;
    const thisUserId = clientuserId;
    const generatedCode = CodeGenerator.EventCodeGenerator(thisEventId, thisUserId);

    try {
      const response = await axios.post(`/UserRegister/Event`, { TicketCode: generatedCode });
      if (response.status >= 200 && response.status <= 299) {
        SetJoinedStatus(true);
        ReInvokeFetchRegistry();
      }
    } catch (error) {
      console.error("Error joining event:", error);
    }
  }

  useEffect(() => {
    SetJoinedStatus(RegistredBoolean);
  }, [RegistredBoolean]);

  // console.log("eventdata: ", eventdata);

  // const [images, setImages] = useState([]);

  // useEffect(() => {
  //   if (Array.isArray(eventdata.imagefiles)) {
  //     const imageUrls = eventdata.imagefiles.map(filename => require(`../../../../server/FileUpload/${filename}`));
  //     setImages(imageUrls);
  //   }
  // }, [eventdata.imagefiles]);


  return (
    <>
      {/* <!-- event post container --> */}
      <div className="flex flex-wrap gap-4 p-4 bg-gray-50 xl:flex-nowrap eventCard">
        {/* <!-- event info container --> */}
        <div className="flex flex-col w-full gap-4 text-center lg:text-start xl:w-1/2">
          {/* <!-- title --> */}
          <h1 className="text-4xl font-semibold lg:text-6xl text-balance font-noto">{eventdata.event_title}</h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium lg:text-lg lg:justify-start">
            {/* <!-- date --> */}
            <h3 className="tagBG">{eventdata.scheduled_date}</h3>
            {/* <!-- time --> */}
            <h3 className="tagBG">{TimeUtils._24HrTo12hr(eventdata.scheduled_time)}</h3>
            {/* <!-- location --> */}
            <h3 className="tagBG">{eventdata.location}</h3>
          </div>
          {/* <!-- desc --> */}
          <p className="pr-2 mt-4 overflow-auto text-justify max-h-52">{eventdata.description}</p>
          {
            JoinedStatus ? (
              <button className="w-10/12 p-4 mx-auto mt-auto text-xl font-medium text-white bg-gray-400 rounded-md scaleHover">
                Joined
              </button>
            ) : (
              <button className="w-10/12 p-4 mx-auto mt-auto text-xl font-medium text-white rounded-md bg-primary-light scaleHover" onClick={JoinButtonAction}>
                Join
              </button>
            )
          }
        </div>
        {/* <!-- img container --> */}
        <div className="order-first w-full xl:w-1/2 xl:order-last">
          {/* <!-- id="smallImg" onclick="enlargeImg()" --> */}
          {/* <img className="object-cover w-full h-full rounded-md" src={require(`../../../../server/FileUpload/${ImageStringUtils.FirstImageElement(eventdata.imagefiles)}`)} alt="img" /> */}

          {/* Carousel component link */}
          {/* https://cloudinary.com/blog/add-a-responsive-image-carousel-to-your-react-app */}
          <Carousel
            useKeyboardArrows={true}
            autoPlay={true}
            infiniteLoop={true}
          >
            <img className="object-cover w-full h-full rounded-md" alt="sample_file" src={require(`../../../../server/FileUpload/${ImageStringUtils.FirstImageElement(eventdata.imagefiles)}`)} />
            {/* <img className="object-cover w-full h-full rounded-md" alt="sample_file" src={require(`../../assets/sample2.jpg`)} /> */}
          </Carousel>
        </div>
      </div>
    </>
  )
}

export default EventPostComponent;
