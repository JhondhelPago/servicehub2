import React from "react";
import { TimeUtils, ImageStringUtils } from "../../module-script/util";
import sample_img from '../../assets/sample_img.jpg';

const JobPostComponent = ({ jobdata }) => {
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
          </div>
          {/* <!-- desc --> */}
          <p className="px-2 mt-4 overflow-auto text-justify max-h-52">{jobdata.description}</p>
          <button className="w-10/12 p-4 mx-auto mt-auto text-xl font-medium text-white rounded-md bg-primary-light scaleHover">Join</button>
        </div>
        {/* <!-- img container --> */}
        <div className="order-first w-full xl:w-1/2 xl:order-last">
          {/* <!-- id="smallImg" onclick="enlargeImg()" --> */}
          <img className="object-cover w-full h-full rounded-md" src={require(`../../../../server/FileUpload/${ImageStringUtils.FirstImageElement(jobdata.imagefiles)}`)} alt="img" />
        </div>
        {/* <!-- join btn --> */}
      </div>
    </>
  )
}

export default JobPostComponent;