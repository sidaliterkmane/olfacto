import axios from "axios";
import React, { createContext, useState, useEffect, ReactNode } from 'react'

export const UserContext = createContext({})

type userContextProviderProps = {
    children: ReactNode;
}

export function UserContextProvider({children}: userContextProviderProps) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        axios.get("/profile")
            .then(({ data }) => {
                if (data) setUser(data);
                else setUser(null); // Set user to null if no user data
            })
            .catch(error => {
                console.error("Failed to fetch profile:", error);
                setUser(null);
            });
    }, []);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}