import React from "react";
import { useState, useEffect } from "react";


const Container = (props) => {

  return (

    <>
      <div className="m-5 boder border-red-500" > 
        <p className='text-green-600'>This is container</p>
        <p>{props.information.id}</p>
        <p>{props.information.email}</p>
      </div>

    </>

  )

}


const Homeprompt = () => {

  //at this time the UserData have the array data of the middle server
  const [UserData, setUserData] = useState(null);

  useEffect(() => {
    GetUserData();
  }, []);

  const GetUserData = async () => {

    try {
      const GetData = await fetch(`/Fetchuser`);
      const FormattedData = await GetData.json();

      setUserData(FormattedData);

    }catch(error){
      throw error;
    }
  };



  return (
    <>
      <div className="flex flex-col">
        
        <p>{UserData ? UserData[0].email : "no data"}</p>


        {UserData && UserData.map(userdata => {

          return (
            <Container information={userdata}></Container>
          )

        })}
      </div>
    </>
  );
};

export default Homeprompt;
