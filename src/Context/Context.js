import React, { createContext, useContext, useEffect, useState } from "react";
import useWindowDimensions from "../Hooks/WindowSizeHook";

// @ts-ignore
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const { width } = useWindowDimensions();

    /**
     * For Checking if USer is Logged in
     * Current user is saved in the Session storage
     * Initial state is determine by the value of session storage
     * if browser is closed user is autometically logged out
     */
    const [isLoggedIn, setIsLoggedIn] = useState(
        sessionStorage.getItem("currentUser") ? true : false
    );
    const [currentUser, setCurrentUser] = useState(
        sessionStorage.getItem("currentUser")
            ? JSON.parse(sessionStorage.getItem("currentUser"))
            : {}
    );
    /**
     * Storing sidebar width and topbar height to
     * dynamically changing container's element width and height
     */
    const [showSidebar, setShowSidebar] = useState(width > 768 ? true : false);
    const [topbarHeight, setTopbarHeight] = useState(0);
    /**
     * Data table filtering information are saved in local Strorage
     * and initiated in Context to make the code more Readable
     */
    // current page tracking for Posts
    const [currentPostPage, setCurrentPostPage] = useState(
        localStorage.getItem("currentPostPage")
            ? parseInt(localStorage.getItem("currentPostPage"))
            : 1
    );
    // current page tracking
    const [currentPage, setCurrentPage] = useState(
        localStorage.getItem("currentPage")
            ? parseInt(localStorage.getItem("currentPage"))
            : 1
    );
    const [itemPerPage, setItemPerPage] = useState(
        localStorage.getItem("itemPerPage")
            ? parseInt(localStorage.getItem("itemPerPage"))
            : 10
    );
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [sortingOrder, setSortingOrder] = useState(
        localStorage.getItem("order") ? localStorage.getItem("order") : "asc"
    );
    /**
     * Fetching all users before as we would need to fetch the several times
     */
    const [users, setUsers] = useState([]);
    const getUsers = async () => {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );
        const result = await response.json();
        setUsers(result);
    };
    // user fetching ands
    useEffect(() => {
        getUsers();
        setCurrentPostPage(
            localStorage.getItem("currentPostPage")
                ? parseInt(localStorage.getItem("currentPostPage"))
                : 1
        );
        width > 768 && setShowSidebar(true);
    }, []);
    return (
        <AuthContext.Provider
            value={{
                users,
                currentUser,
                isLoggedIn,
                currentPostPage,
                currentPage,
                sortingOrder,
                topbarHeight,
                showSidebar,
                itemPerPage,
                search,
                sorting,
                setItemPerPage,
                setSearch,
                setShowSidebar,
                setSorting,
                setTopbarHeight,
                setIsLoggedIn,
                setCurrentUser,
                setCurrentPostPage,
                setCurrentPage,
                setSortingOrder,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AuthContext);
};

export { AuthContext, AuthProvider };
