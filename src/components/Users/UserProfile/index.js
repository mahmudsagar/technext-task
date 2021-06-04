import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext, useGlobalContext } from "../../../Context/Context";
import UserPosts from "../../Blog/UserPosts";
import UserInfo from "../UserData/index";

const UserProfile = () => {
    const { users, topbarHeight, showSidebar } = useGlobalContext(AuthContext);
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

    const wrapperPosition = {
        marginTop: topbarHeight / 16 + 3 + "rem",
        marginLeft: `${showSidebar ? "13rem" : "1rem"}`,
        width: `${showSidebar ? "calc(100% - 240px)" : "calc(100% - 50px)"}`,
        transition: "all ease-in-out .5s",
    };

    return (
        <div
            style={ wrapperPosition  }
            className="wrapper"
        >
            <UserInfo user={user} />
            <UserPosts id={parseInt(id)} />
        </div>
    );
};

export default UserProfile;
