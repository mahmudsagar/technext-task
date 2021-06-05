import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext, useGlobalContext } from "../../../Context/Context";
import Comments from "../../Comments";

const PostDetails = () => {
    const { users, topbarHeight, showSidebar } = useGlobalContext(AuthContext);
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [user, setUser] = useState({})

    const wrapperPosition = {
        marginTop: topbarHeight / 16 + 3 + "rem",
        marginLeft: `${showSidebar ? "13rem" : "1rem"}`,
        width: `${showSidebar ? "calc(100% - 240px)" : "calc(100% - 50px)"}`,
        transition: "all ease-in-out .5s",
    };
    useEffect(() => {
        const getData = async () => {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/posts/${id}`
            );
            const result = await response.json();
            setPost(result);
            setUser(users.find((user)=> user.id === result.userId))
        };
        getData();
    }, [id]);
    console.log(user);
    return (
        <div style={wrapperPosition} className="wrapper">
            <div className="card">
                <span className="h3">{id}</span>
                <h2>Title: {post.title}</h2>
                <strong>Author: {user?.name}</strong>
                <p className="card-text">{post.body}</p>
            </div>
            <hr />
            <h4>Comments</h4>
            <Comments id={id} />
        </div>
    );
};

export default PostDetails;
