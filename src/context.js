import React, { createContext, useState } from 'react';

export const AppsContext = createContext();

export const AppsProvider = (props) => {
    const [user, setUser] = useState({
        id:"",
        token:""
    });
    

    return (
        <AppsContext.Provider value={[user, setUser]}>
            {props.children}
        </AppsContext.Provider>
    );
}