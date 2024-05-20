import React from 'react';

import childCom from './sampeReact';




const Homeprompt = () => {
    return (
        <>
            <head>
                <title>Dashboard</title>
            </head>
            <div>
                <p className="text-xl text-red-600">Admin Dashborad</p>
                <SampleComponent></SampleComponent>
            </div>
        </>
    )
}

const SampleComponent = () => {

    


    return (
        <>
            <div>
                <button className='border border-black'>click here</button>
                <p></p>
            </div>
        </>
    )
}





export default Homeprompt;