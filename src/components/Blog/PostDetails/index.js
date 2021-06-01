import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Comments from "../../Comments";
import PostItem from "../PostItem";

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const getData = async () => {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        const result = await response.json();
        setPost(result);
    };

    useEffect(() => {
        getData();
    }, []);
    // console.log(post);
    return (
        <div>
            <div className="card bg-fuchsia">
                <span className="h3">{id}</span>
                <h2>Title: {post.title}</h2>
                <p className="card-text">{post.body}</p>
            </div>
            <hr/>
            <h4>Comments</h4>
            <Comments id={id}/>
        </div>
    );
};

export default PostDetails;
