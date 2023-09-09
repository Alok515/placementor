import { createContext, useEffect, useState } from "react";

export const Auth = createContext();

export const AuthContext = ({ children }) => {
    const [emp, setEmp ] = useState();

    useEffect(() => {
        const localemp = JSON.parse(localStorage.getItem('emp'));
        if (localemp) setEmp(localemp);
    },[]);

    return <Auth.Provider value={{emp, setEmp}}>
        { children }
    </Auth.Provider>
}