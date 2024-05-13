import React, {createContext, useState, useEffect} from 'react';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [AdminId, setAdminId] = useState(() => {
        const storedAdminId = localStorage.getItem('AdminId');
        return storedAdminId ? JSON.parse(storedAdminId) : null;
    });

    useEffect(() => {
        localStorage.setItem('AdminId', JSON.stringify(AdminId));
    }, [AdminId]);

    return (
        <UserContext.Provider value={{AdminId, setAdminId}}>
            {children}
        </UserContext.Provider>
    );
};