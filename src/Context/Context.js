import React, { createContext, useContext, useEffect, useState } from "react";
import useWindowDimensions from "../Hooks/WindowSizeHook";

// @ts-ignore
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const { width } = useWindowDimensions();

    /**
     * For Checking if User is Logged in
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
    // current page on user Table tracking
    const [currentPage, setCurrentPage] = useState(
        localStorage.getItem("currentPage")
            ? parseInt(localStorage.getItem("currentPage"))
            : 1
    );
    // Save item to show per page on user table
    const [itemPerPage, setItemPerPage] = useState(
        localStorage.getItem("itemPerPage")
            ? parseInt(localStorage.getItem("itemPerPage"))
            : 10
    );

    /**
     * Save searched item to show on user table
     * if already seached once then it will save the data and 
     * show the data even if page reloads if searched value not changed or removed
     */
    const [search, setSearch] = useState("");
    /**
     * Save soreted order to show on user table
     * if already sorted once then it will save the data and 
     * show the data even if page reloads if sort value not changed or removed
     */
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
        /**
         * 
         * tranking window size to show the side in bigeer screen by default
         * sidebar will hide itself if device is small
         * 
         */
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
                itemPerPage,
                search,
                sorting,
                topbarHeight,
                showSidebar,
                setItemPerPage,
                setSearch,
                setSorting,
                setIsLoggedIn,
                setCurrentUser,
                setCurrentPostPage,
                setCurrentPage,
                setSortingOrder,
                setTopbarHeight,
                setShowSidebar,
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
