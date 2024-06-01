import React, { createContext, useState, useEffect } from 'react';

//creating a context object
export const ClientUserContext = createContext();

export const UserProvider = ({children}) => {

    

        const [clientuserId, set_clientuserId] = useState(() => {
            
            const stored_clientuserId = localStorage.getItem('clientuserId'); // get a value from the localStorage with key of clientuserId
            //this return the value if the key is valid, return null if the key is not valid,


            //this return statement ask if the stored_clientuserId is not null, then it return the JSON.parse(value), if stored_clientuserId is null then it return null
            console.log(stored_clientuserId);
            return stored_clientuserId ? JSON.parse(stored_clientuserId) : null;

        });


        //useEffect Hook

        useEffect(() => {

            localStorage.setItem('clientuserId', JSON.stringify(clientuserId));

        }, [clientuserId]);

        return(

            <ClientUserContext.Provider value={{clientuserId, set_clientuserId}}>
                {children}
            </ClientUserContext.Provider>

        )


}