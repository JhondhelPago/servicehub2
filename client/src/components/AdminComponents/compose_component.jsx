import React, { useContext } from "react";
import { useState } from 'react';
import axios from 'axios';
import { UserContext } from "../LoginComponents/UserContext";


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


  const SendAdminMail = async (event) => {
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
        ShowSentItem();
      }

    } catch (error) {
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
      </div>
    </>
  )
}

export default ComposeComponent;