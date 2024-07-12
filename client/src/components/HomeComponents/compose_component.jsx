import React, { useContext } from "react";
import { useState } from 'react';
import axios from "axios";
import { ClientUserContext } from "../../pages/ClientUserContext";


const ComposeComponent = ({ RenderSentItem, RenderInboxComponent }) => {

  const { clientuserId } = useContext(ClientUserContext);


  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);


  const handleFileChange = (event) => {
    
    setFiles(event.target.files);

  }

  const handleSendMail = async(event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('senderClientId', clientuserId);
    formData.append('subject', subject);
    formData.append('message', message);


    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }


    try{

      const response = await axios.post('/ClientSendMail', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(`status: ${response.data}`);
      //some function here to redirect
      RenderInboxComponent();


    }catch(error){
      console.log(`error on the compose_component at the function 'handleSendMail'.`, error);
      throw error;
    }


  }




  // const handleTypeChange = (event) => {
  //   setType(event.target.value);
  // }

  // const handleSubjectChange = (event) => {
  //   setSubject(event.target.value);
  // }

  // const handleBodyChange = (event) => {
  //   setBody(event.target.value);
  // }

  //handle file change here 


  // const sendMail = async (event) => {
  //   event.preventDefault();


  //   const MailType = Type;
  //   const MailSubject = Subject;
  //   const MailBody = Body;


  //   try {
  //     //axios to post request

  //     const response = await axios.post('/ClientSendMail', {
  //       SenderId: clientuserId,
  //       MailType: MailType,
  //       MailSubject: MailSubject,
  //       MailBody: MailBody
  //     });


  //     if (response.status >= 200 && response.status < 300) {
  //       RenderSentItem();
  //     }



  //     console.log('axios MailSend may post the request');


  //   } catch (error) {
  //     throw error;
  //   }

  // }


  return (
    <>
      {/* <!-- compose container --> */}
      <div className="flex justify-center pb-5 overflow-auto rounded">
        {/* <!-- form container --> */}
        <form onSubmit={handleSendMail} method="post" className="flex flex-col w-full gap-5 py-2 rounded lg:w-[80%]">
          <div className="flex items-center w-full gap-4">
            {/* <label className="w-24 pl-2" htmlFor="">Mail Type:</label> */}
            {/* <input className="px-4 py-2 bg-white rounded grow" type="text"/> */}
            {/* <select className="px-4 py-2 bg-white border rounded border-darkColor grow" onChange={handleTypeChange} required>
              <option value='' disabled hidden selected>Please Select Mail Type</option>
              <option value='inquiry'>Inquiries</option>
              <option value='request'>Request</option>
            </select> */}
          </div>
          <div className="flex items-center w-full gap-4">
            <label className="w-24 pl-2" htmlFor="">Subject:</label>
            <input className="px-4 py-2 bg-white border rounded border-darkColor grow" type="text" onChange={(e) => setSubject(e.target.value)} required />
          </div>

          {/* <!-- <label className="opacity-70" for="">To:</label> --> */}
          <textarea className="w-full px-4 py-2 min-h-[300px] bg-white border rounded border-darkColor h-fit" name="" id="" cols="30" rows="10" placeholder="Message goes here." onChange={(e) => setMessage(e.target.value)} required></textarea>

          <div className="flex items-center w-full mx-auto border rounded border-darkColor">
            <input class="file:mr-4 w-full file:py-4 file:border-darkColor file:px-4 file:border-r file:border-l-0 file:border-t-0 file:border-b-0 file:font-medium file:bg-transparent file:text-primary-light hover:file:text-white hover:file:bg-primary-light" id="file" type="file" accept="image/*, .pdf, .doc, .docx, .txt" onChange={handleFileChange} multiple />
          </div>

          <div className="w-2/6 mx-auto text-center">
            <button type="submit" className="w-full py-2 text-white rounded bg-primary-light scaleHover">Send</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default ComposeComponent;