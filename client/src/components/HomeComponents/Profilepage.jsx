import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { ClientUserContext } from "../../pages/ClientUserContext";
import axios from "axios";

// import Nav from '../components/nav.jsx';

const Profilepage = () => {

  const { clientuserId } = useContext(ClientUserContext);

  const [ClientData, setClientData] = useState(null);

  const FetchClientData = async () => {
    const response = await axios.get(`/ClientDataRequest/${clientuserId}`);

    const data = response.data;
    setClientData(data);
  };

  useEffect(() => {
    FetchClientData();
    console.log(ClientData);
  }, []);
  // function to get the data from the server, but after serve must be prepare

  return (
    <>
      <head>
        <title>Profile</title>
      </head>
      <div className="container flex flex-col justify-center gap-5 p-5 mx-auto">
        <h1 className="text-6xl font-semibold text-center font-noto">
          My Profile {clientuserId}
        </h1>
        <div className="w-full border rounded-md border-darkColor">
          <table className="border-collapse">
            <tr>
              <th className="p-5 border-b border-r border-darkColor">ID</th>
              <td className="w-full p-5 border-b border-darkColor">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Distinctio, cupiditate? Consequuntur libero voluptatem quam a
                repellendus laudantium earum temporibus assumenda.
              </td>
            </tr>
            <tr>
              <th className="p-5 border-b border-r border-darkColor">
                Username
              </th>
              <td className="w-full p-5 border-b border-darkColor">
                {ClientData && `${ClientData[0].firstName}`}
              </td>
            </tr>
            <tr>
              <th className="p-5 border-b border-r border-darkColor">Name</th>
              <td className="w-full p-5 border-b border-darkColor">
                {ClientData &&
                  `${ClientData[0].firstName} ${ClientData[0].middleName} ${ClientData[0].Lastname}`}
              </td>
            </tr>
            <tr>
              <th className="p-5 border-b border-r border-darkColor">Age</th>
              <td className="w-full p-5 border-b border-darkColor">
                {ClientData && `${ClientData[0].age}`}
              </td>
            </tr>
            <tr>
              <th className="p-5 border-b border-r border-darkColor">Gender</th>
              <td className="w-full p-5 border-b border-darkColor">
                {ClientData && `${ClientData[0].gender}`}
              </td>
            </tr>
            <tr>
              <th className="p-5 border-b border-r border-darkColor">
                Address
              </th>
              <td className="w-full p-5 border-b border-darkColor">
                {ClientData &&
                  `${ClientData[0].houseno} ${ClientData[0].street} ${ClientData[0].barangay} ${ClientData[0].city} ${ClientData[0].district} ${ClientData[0].zipcode}`}
              </td>
            </tr>
            <tr>
              <th className="p-5 border-b border-r border-darkColor">City</th>
              <td className="w-full p-5 border-b border-darkColor">
                {ClientData && `${ClientData[0].city}`}
              </td>
            </tr>
            <tr>
              <th className="p-5 border-b border-r border-darkColor">
                District
              </th>
              <td className="w-full p-5 border-b border-darkColor">
                {ClientData && `${ClientData[0].district}`}
              </td>
            </tr>
            <tr>
              <th className="p-5 border-b border-r border-darkColor">
                Contact No.
              </th>
              <td className="w-full p-5 border-b border-darkColor">
                {ClientData && `${ClientData[0].phone}`}
              </td>
            </tr>
            <tr>
              <th className="p-5 border-r border-darkColor">Member Status</th>
              <td className="w-full p-5">
                {ClientData && `${ClientData[0].status}`}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};

export default Profilepage;
