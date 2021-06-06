import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext, useGlobalContext } from "../../../Context/Context";
import UserPosts from "../UserPosts";
import UserInfo from "../UserInfo/index";
import UserList from "../UserList";

const UserProfile = () => {
    const { users, topbarHeight, showSidebar, isLoggedIn, currentUser } =
        useGlobalContext(AuthContext);
    const { id } = useParams();
    const [user, setUser] = useState({});
    useEffect(() => {
        const getUserDetails = async () => {
            let userResult = await users.find(
                (details) => details.id === parseInt(id)
            );
            setUser(userResult);
        };
        getUserDetails();
    }, [id, users]);
    // style to set size and resize of Main container or wrapper
    const wrapperPosition = {
        marginTop: topbarHeight / 16 + 3 + "rem",
        marginLeft: `${showSidebar ? "13rem" : "1rem"}`,
        width: `${showSidebar ? "calc(100% - 240px)" : "calc(100% - 50px)"}`,
        transition: "all ease-in-out .5s",
    };

    return (
        <div style={wrapperPosition} className="wrapper">
            {/* user details */}
            <div className="row">
                <div className="col-md-5 order-2">
                    <UserInfo user={user} />
                </div>
                {/* Post table containing users Posts */}
                <div className="col-md-7 order-1">
                    <div className={`user-post-card card`}>
                        <h1
                            style={{
                                color: "#6c757d",
                                textShadow: "0 0 3px #ddd",
                                WebkitTextStroke: "2px #343a40",
                            }}
                        >
                            {user?.name}'s Posts
                        </h1>
                        <UserPosts id={parseInt(id)} />
                    </div>
                </div>
            </div>
            {/* showing all other users to current user */}
            {isLoggedIn && currentUser?.id === user?.id && (
                <div className={`user-post-card card`}>
                    <h1
                            style={{
                                color: "#6c757d",
                                textShadow: "0 0 3px #ddd",
                                WebkitTextStroke: "2px #343a40",
                            }}
                        >
                            All Users
                        </h1>
                    <div className="row">
                        <UserList />
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
