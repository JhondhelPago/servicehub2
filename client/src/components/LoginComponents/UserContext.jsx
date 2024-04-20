import React, {createContext, useState} from 'react';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [AdminId, setAdminId] = useState(null);

    return (
        <UserContext.Provider value={{AdminId, setAdminId}}>
            {children}
        </UserContext.Provider>
    );
};