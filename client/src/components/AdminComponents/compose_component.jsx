import React, { useContext } from "react";
import { useState } from 'react';
import axios from 'axios';
import { UserContext } from "../LoginComponents/UserContext";
import LoadingIcons from "react-loading-icons";


const ComposeComponent = ({ ShowSentItem }) => {

  const { AdminId } = useContext(UserContext);

  const [ReceiverId, SetReceiverId] = useState('null');
  const [Subject, SetSubject] = useState('null');
  const [Body, SetBody] = useState('null');


  const handleReceiverChange = (event) => {
    SetReceiverId(event.target.value);
  }

  const handleSubjectChange = (event) => {
    SetSubject(event.target.value);
  }

  const handleBodyChange = (event) => {
    SetBody(event.target.value)
  }


  const statelog = () => {
    console.log(AdminId);
    console.log(ReceiverId);
    console.log(Subject);
    console.log(Body);
  }

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState(false)

  const SendAdminMail = async (event) => {
    setIsLoading(true)
    event.preventDefault();


    const MailReceiverId = ReceiverId;
    const MailSubject = Subject;
    const MailBody = Body;

    console.log('SendMail Blocks');

    try {

      const response = await axios.post('/AdminMailInsert', {
        SenderId: AdminId,
        MailReceiverId: MailReceiverId,
        MailSubject: MailSubject,
        MailBody: MailBody
      });

      console.log(response);

      if (response.status >= 200 && response.status < 300) {
        console.log('this control flow is trigerring function from parent component');
      }
      setIsSuccessful(true)

    } catch (error) {
      setIsLoading(false)
      throw error;
    }

  }

  return (
    <>
      {/* <!-- compose container --> */}
      <div className="flex justify-center px-5 pb-5 overflow-auto rounded">
        {/* <!-- form container --> */}
        <form method='post' onSubmit={SendAdminMail} className="flex flex-col w-full gap-5 py-2 rounded lg:w-[80%]">
          <div className="flex items-center w-full gap-4">
            <label className="w-16 pl-2" htmlFor="">To:</label>
            <input className="px-4 py-2 bg-white border rounded border-darkColor grow" type="text" onChange={handleReceiverChange} />
          </div>
          <div className="flex items-center w-full gap-4">
            <label className="w-16 pl-2" htmlFor="">Subject:</label>
            <input className="px-4 py-2 bg-white border rounded border-darkColor grow" type="text" onChange={handleSubjectChange} />
          </div>

          {/* <!-- <label className="opacity-70" for="">To:</label> --> */}
          <textarea className="w-full h-full min-h-[300px] px-4 py-2 bg-white border rounded border-darkColor" name="" id="" cols="30" rows="10" onChange={handleBodyChange} placeholder="Message goes here."></textarea>

          <div className="flex items-center w-full mx-auto border rounded border-darkColor">
            <input class="file:mr-4 w-full file:py-4 file:border-darkColor file:px-4 file:border-r file:border-l-0 file:border-t-0 file:border-b-0 file:font-medium file:bg-transparent file:text-primary-light hover:file:text-white hover:file:bg-primary-light" id="" type="file" multiple />
          </div>

          <div className="w-2/6 mx-auto text-center">
            <button type="submit" className="w-full py-2 text-white rounded bg-primary-light scaleHover" >Send</button>
          </div>
        </form>
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
                      setIsSuccessful(false)
                      ShowSentItem();
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