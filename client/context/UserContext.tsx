import axios from "axios";
import React, { createContext, useState, useEffect, ReactNode } from 'react'

export const UserContext = createContext({})

type userContextProviderProps = {
    children: ReactNode;
}

export function UserContextProvider({children}: userContextProviderProps) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        if (!user) {
            axios.get("/profile").then(({data}) => {
                setUser(data)
            })
        }
    }, [user])

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}