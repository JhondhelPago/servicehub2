import React, { useContext } from "react";
import { TimeUtils, ImageStringUtils } from '../../module-script/util';
import { ClientUserContext } from "../../pages/ClientUserContext";
import { CodeGenerator } from "../../utils";
import axios from "axios";
// import sample_img from '../../assets/sample_img.jpg';

const EventPostComponent = ({ eventdata , RegistredBoolean}) => {

  //to be foloowed
  //using useffect populate an array containing the image from the FileUpload folder by passing the imagefiles->filname, then display the image


  //logic here to register this client user when the join button is hit

  const { clientuserId } = useContext(ClientUserContext);


  const JoinButtonAction = async() => {
    
    //importat note: do not allow the user to join multiple times.
    //check if the user has already joined the event before allowing them to join again
    //function here to get all the ticketcode. then process an find if this event.id is associated a certain ticketcode


    //if not generateTicketCode and register this event to this user.

    console.log(eventdata);
    alert(`join button is click`);


    const thisEventId = eventdata.id;
    const thisUserId = clientuserId;

    console.log(thisEventId);
    console.log(thisUserId);

    const generatedCode = CodeGenerator.EventCodeGenerator(thisEventId, thisUserId);
    
    console.log(generatedCode);


    const response = await axios.post(`/UserRegister/Event`, {TicketCode: generatedCode});


    if(response.status >= 200 && response.status <= 299){
      console.log('registered');
    }
  
  }

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
          {/* <button className="w-10/12 p-4 mx-auto mt-auto text-xl font-medium text-white rounded-md bg-primary-light scaleHover" onClick={() => {JoinButtonAction()}}>Join</button> */}
          
         {//control flow here to render the right button for this event post if the clientuser is already registered or not yet registered. the button is dynamically rendered based on the the status of this user about this event post

         RegistredBoolean ? ( //this buttion is rendered if the clientuser is already registered in this post
          
          <button className="w-10/12 p-4 mx-auto mt-auto text-xl font-medium text-white rounded-md bg-gray-400 scaleHover">Joined</button>

         ) : ( // this button is rendered if  the clientuser is not yet registered in this post

          <button className="w-10/12 p-4 mx-auto mt-auto text-xl font-medium text-white rounded-md bg-primary-light scaleHover" onClick={() => {JoinButtonAction()}}>Join</button>

         )
          
         }
        </div>
        {/* <!-- img container --> */}
        <div className="order-first w-full xl:w-1/2 xl:order-last">
          {/* <!-- id="smallImg" onclick="enlargeImg()" --> */}
          <img className="object-cover w-full h-full rounded-md" src={require(`../../../../server/FileUpload/${ImageStringUtils.FirstImageElement(eventdata.imagefiles)}`)} alt="img" />
        </div>
        {/* <!-- join btn --> */}
      </div>
    </>
  )
}

export default EventPostComponent;