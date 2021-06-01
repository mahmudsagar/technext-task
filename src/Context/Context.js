import React, {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
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
        <AuthContext.Provider
            value={{
                users,
                isLoggedIn,
                setIsLoggedIn,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AuthContext);
};

export {AuthContext, AuthProvider};