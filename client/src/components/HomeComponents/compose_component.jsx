import React from "react";
import { useState } from 'react';
import axios from "axios";
const ComposeComponent = ({userId}) => {

  const [Type, setType] = useState(null);
  const [Subject, setSubject] = useState(null);
  const [Body, setBody] = useState(null);



  const handleTypeChange = (event) => {
    setType(event.target.value);
  }

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  }

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  }


  const sendMail = async(event) => {
    event.preventDefault();


    const MailType = Type;
    const MailSubject = Subject;
    const MailBody = Body;


    try{
      //axios to post request
      
      const response = await axios.post('/ClientSendMail', {
          SenderId: userId,
          MailType: MailType,
          MailSubject: MailSubject,
          MailBody: MailBody
      });

      console.log('axios MailSend may post the request');


    }catch(error){
      throw error;
    }

  }


  return (
    <>
      {/* <!-- compose container --> */}
      <div className="px-5 pb-5 h-dvh flex justify-center rounded overflow-auto">
          {/* <!-- form container --> */}
          <form onSubmit={sendMail} method="post" className="p-2 w-full md:w-3/5 flex flex-col gap-5 rounded">
              <div className="w-full flex items-center gap-4">
                  <label className="w-16 pl-2" htmlFor="">To:</label>
                  {/* <input className="grow py-2 px-4 rounded bg-white" type="text"/> */}
                  <select className="grow py-2 px-4 rounded bg-white" onChange={handleTypeChange} required>
                    <option value='' disabled hidden selected>Please Select Mail Type</option>
                    <option value='inquiry'>Inquiries</option>
                    <option value='request'>Request</option>
                  </select>
              </div>
              <div className="w-full flex items-center gap-4">
                  <label className="w-16 pl-2" htmlFor="">Subject:</label>
                  <input className="grow py-2 px-4 rounded bg-white" type="text" onChange={handleSubjectChange} required/>
              </div>
              {/* <!-- <label className="opacity-70" for="">To:</label> --> */}
              <textarea className="w-full h-full py-2 px-4 rounded bg-white" name="" id="" cols="30" rows="10" onChange={handleBodyChange} required></textarea>
              <div className="w-2/6 mx-auto text-center">
                  <button className="w-full py-2 rounded text-white bg-primary-light scaleHover">Send</button>
              </div>
          </form>
      </div>
    </>
  )
}

export default ComposeComponent;