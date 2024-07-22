import React, { useContext } from "react";
import { useState } from 'react';
import axios from "axios";
import { ClientUserContext } from "../../pages/ClientUserContext";
import LoadingIcons from "react-loading-icons";


const ComposeComponent = ({ RenderSentItem, RenderInboxComponent }) => {

  const { clientuserId } = useContext(ClientUserContext);


  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);


  const handleFileChange = (event) => {

    setFiles(event.target.files);

  }

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState(false)

  const handleSendMail = async (event) => {
    setIsLoading(true)
    event.preventDefault();

    const formData = new FormData();

    formData.append('senderClientId', clientuserId);
    formData.append('subject', subject);
    formData.append('message', message);


    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }


    try {

      const response = await axios.post('/ClientSendMail', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(`status: ${response.data}`);
      setIsSuccessful(true)
      //some function here to redirect


    } catch (error) {
      console.log(`error on the compose_component at the function 'handleSendMail'.`, error);
      setIsLoading(false)
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
        {/* https://www.npmjs.com/package/react-loading-icons */}
        {/* npm i react-loading-icons */}
        {isLoading && (
          <div className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-60 backdrop-blur-sm">
            <div className="sm:w-[30%] mx-5 w-full sm:min-w-[400px] max-w-[500px] flex flex-col bg-white z-[11] rounded-lg p-10 justify-center relative">
              {isSuccessful ? (
                <div className="flex flex-col gap-7">
                  <svg className="h-12 text-primary-light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z" /></svg>
                  <h1 className="text-3xl font-semibold text-center font-noto">Sending Complete</h1>
                  <h3 className="mb-3 overflow-auto text-lg text-center font-noto">
                    Message is sent successfully.
                  </h3>
                  <button
                    className="px-5 py-2 mx-auto text-lg text-white rounded bg-primary-light scaleHover"
                    onClick={() => {
                      setIsLoading(false)
                      RenderInboxComponent()
                    }}
                  >Done</button>
                </div>
              ) : (
                <div className="flex flex-col gap-7">
                  <LoadingIcons.TailSpin stroke="#CD890A" className="w-12 h-12 mx-auto" strokeWidth={2}></LoadingIcons.TailSpin >
                  <h1 className="text-3xl font-semibold text-center font-noto">Loading</h1>
                  <h3 className="mb-3 overflow-auto text-lg text-center font-noto">
                    Please wait.
                  </h3>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ComposeComponent;