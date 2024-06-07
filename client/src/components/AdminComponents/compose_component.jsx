import React, { useContext } from "react";
import { useState } from 'react';
import axios from 'axios';
import { UserContext } from "../LoginComponents/UserContext";


const ComposeComponent = ( { ShowSentItem } ) => {

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


  const SendAdminMail = async(event) => {
      event.preventDefault();
      

      const MailReceiverId = ReceiverId;
      const MailSubject = Subject;
      const MailBody = Body;

      console.log('SendMail Blocks');

      try{

        const response = await axios.post('/AdminMailInsert', {
          SenderId : AdminId  ,
          MailReceiverId : MailReceiverId,     
          MailSubject : MailSubject,
          MailBody : MailBody
        });

        console.log(response);
        
        if(response.status >= 200 && response.status < 300){
          console.log('this control flow is trigerring function from parent component');
          ShowSentItem();
        }

      }catch(error){
        throw error;
      }

  }

  return (
    <>
      {/* <!-- compose container --> */}
      <div className="px-5 pb-5 h-dvh flex justify-center rounded overflow-auto">
          {/* <!-- form container --> */}
          <form method='post' onSubmit={SendAdminMail} className="p-2 w-full md:w-3/5 flex flex-col gap-5 rounded">
              <div className="w-full flex items-center gap-4">
                  <label className="w-16 pl-2" htmlFor="">To:</label>
                  <input className="grow py-2 px-4 rounded bg-white" type="text" onChange={handleReceiverChange}/>
              </div>
              <div className="w-full flex items-center gap-4">
                  <label className="w-16 pl-2" htmlFor="">Subject:</label>
                  <input className="grow py-2 px-4 rounded bg-white" type="text" onChange={handleSubjectChange}/>
              </div>
              {/* <!-- <label className="opacity-70" for="">To:</label> --> */}
              <textarea className="w-full h-full py-2 px-4 rounded bg-white" name="" id="" cols="30" rows="10" onChange={handleBodyChange}></textarea>
              <div className="w-2/6 mx-auto text-center">
                  <button type="submit" className="w-full py-2 rounded text-white bg-primary-light scaleHover" >Send</button>
              </div>
          </form>
      </div>
    </>
  )
}

export default ComposeComponent;