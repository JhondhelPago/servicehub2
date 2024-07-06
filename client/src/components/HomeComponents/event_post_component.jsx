import React, { useContext, useEffect, useState } from "react";
import { TimeUtils, ImageStringUtils } from '../../module-script/util';
import { ClientUserContext } from "../../pages/ClientUserContext";
import { CodeGenerator } from "../../utils";
import axios from "axios";

const EventPostComponent = ({ eventdata , RegistredBoolean, ReInvokeFetchRegistry }) => {

  const { clientuserId } = useContext(ClientUserContext);

  // Initialize JoinedStatus based on RegistredBoolean prop
  const [JoinedStatus, SetJoinedStatus] = useState(RegistredBoolean);

  const JoinButtonAction = async() => {
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

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-50 xl:flex-nowrap eventCard">
      <div className="flex flex-col w-full gap-4 text-center lg:text-start xl:w-1/2">
        <h1 className="text-4xl font-semibold lg:text-6xl text-balance font-noto">
          {eventdata.event_title}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm font-medium lg:text-lg lg:justify-start">
          <h3 className="tagBG">{eventdata.scheduled_date}</h3>
          <h3 className="tagBG">{TimeUtils._24HrTo12hr(eventdata.scheduled_time)}</h3>
          <h3 className="tagBG">{eventdata.location}</h3>
        </div>
        <p className="pr-2 mt-4 overflow-auto text-justify max-h-52">{eventdata.description}</p>
        {
          JoinedStatus ? (
            <button className="w-10/12 p-4 mx-auto mt-auto text-xl font-medium text-white rounded-md bg-gray-400 scaleHover">
              Joined
            </button>
          ) : (
            <button className="w-10/12 p-4 mx-auto mt-auto text-xl font-medium text-white rounded-md bg-primary-light scaleHover" onClick={JoinButtonAction}>
              Join
            </button>
          )
        }
      </div>
      <div className="order-first w-full xl:w-1/2 xl:order-last">
        <img className="object-cover w-full h-full rounded-md" src={require(`../../../../server/FileUpload/${ImageStringUtils.FirstImageElement(eventdata.imagefiles)}`)} alt="img" />
      </div>
    </div>
  )
}

export default EventPostComponent;
