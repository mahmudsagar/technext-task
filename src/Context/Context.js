import React, {createContext, useContext, useEffect, useState} from "react";

const UserContext = createContext();

const UserProvider = ({children}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [users, setUsers] = useState([])

    const getUsers = async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/users")
        const result = await response.json()
        setUsers(result)
    }
    useEffect(() => {
        getUsers()
    }, [])

    return (
        <UserContext.Provider
            value={{
                users,
                isLoggedIn,
                setIsLoggedIn,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(UserContext);
};

export {UserContext, UserProvider};