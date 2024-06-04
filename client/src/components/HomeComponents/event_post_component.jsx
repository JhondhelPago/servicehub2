import React from "react";
import { TimeUtils, ImageStringUtils } from '../../module-script/util';
// import sample_img from '../../assets/sample_img.jpg';

const EventPostComponent = ({ eventdata }) => {

  //to be foloowed
  //using useffect populate an array containing the image from the FileUpload folder by passing the imagefiles->filname, then display the image

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
          <button className="w-10/12 p-4 mx-auto text-xl font-medium text-white rounded-md bg-primary-light scaleHover">Join</button>
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