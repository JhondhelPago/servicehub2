import React from "react";
import { useState, useEffect } from "react";

const Homeprompt = () => {
  const [UserData, setUserData] = useState(null);

  useEffect(() => {
    GetUserData();
  }, []);

  const GetUserData = async () => {
    try {
      const GetData = await fetch(`/Fetchuser`);
      const FormattedData = GetData.json();

      setUserData(FormattedData);
    } catch (error) {
      throw error;
    }
  };

  const authorName = "JR";

  return (
    <>
      <p>Author: {authorName} A. Solis</p>
      <p>{UserData ? UserData[0].email : "no data"}</p>
    </>
  );
};

export default Homeprompt;
