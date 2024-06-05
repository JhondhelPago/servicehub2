import React from 'react';
import { useState } from 'react';

// import Nav from '../components/nav.jsx';

const Profilepage = () => {
  return (
    <>
      <head>
        <title>Profile</title>
      </head>
      <div className="container flex flex-col justify-center gap-5 p-5 mx-auto">
        <h1 className="text-6xl font-semibold text-center font-noto">My Profile </h1>
        <div className="w-full border rounded-md border-darkColor">
          <table className="border-collapse">
            <tr>
              <th className="p-5 border-b border-r border-darkColor">ID</th>
              <td className="w-full p-5 border-b border-darkColor">Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Distinctio, cupiditate? Consequuntur libero voluptatem quam a repellendus laudantium earum temporibus
                assumenda.</td>
            </tr>
            <tr>
              <th className="p-5 border-b border-r border-darkColor">Username</th>
              <td className="w-full p-5 border-b border-darkColor">912309123901237</td>
            </tr>
            <tr>
              <th className="p-5 border-b border-r border-darkColor">Name</th>
              <td className="w-full p-5 border-b border-darkColor">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Autem expedita, quaerat dolore dignissimos vero ullam id consequuntur! Minima, corrupti aut.</td>
            </tr>
            <tr>
              <th className="p-5 border-b border-r border-darkColor">Age</th>
              <td className="w-full p-5 border-b border-darkColor">912309123901237</td>
            </tr>
            <tr>
              <th className="p-5 border-b border-r border-darkColor">Gender</th>
              <td className="w-full p-5 border-b border-darkColor">912309123901237</td>
            </tr>
            <tr>
              <th className="p-5 border-b border-r border-darkColor">Address</th>
              <td className="w-full p-5 border-b border-darkColor">912309123901237</td>
            </tr>
            <tr>
              <th className="p-5 border-b border-r border-darkColor">City</th>
              <td className="w-full p-5 border-b border-darkColor">912309123901237</td>
            </tr>
            <tr>
              <th className="p-5 border-b border-r border-darkColor">District</th>
              <td className="w-full p-5 border-b border-darkColor">912309123901237</td>
            </tr>
            <tr>
              <th className="p-5 border-b border-r border-darkColor">Contact No.</th>
              <td className="w-full p-5 border-b border-darkColor">912309123901237</td>
            </tr>
            <tr>
              <th className="p-5 border-r border-darkColor">Member Status</th>
              <td className="w-full p-5">912309123901237</td>
            </tr>
          </table>
        </div>
      </div>

    </>
  )
}


export default Profilepage;