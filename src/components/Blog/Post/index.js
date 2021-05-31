import React, { useEffect, useState } from "react";
import PostItem from "../PostItem";
import "./style.css";

const PostList = () => {
    // posts
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // controlled output
    const [postsToShow, setPostsToShow] = useState(posts);
    const [next, setNext] = useState(10);
    let holdingPosts = [];
    const POST_PER_PAGE = 10;

    // handle click
    const handleShowMore = () => {
        loopWithSlice(0, next + POST_PER_PAGE);
        setNext(next + POST_PER_PAGE);
      };

    /*
     * Slicing Post List
     */

    const loopWithSlice = (start, end) => {
        const slicedPosts = posts.slice(start, end);
        holdingPosts = [...holdingPosts, ...slicedPosts];
        setPostsToShow(holdingPosts);
    };
    /*
     * Fetch Posts from Api
     */
    const getData = async () => {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts"
        );
        const result = await response.json();
        // fetch("https://jsonplaceholder.typicode.com/posts")
        //     .then((response) => response.json())
        //     .then((result) => {
        //     })
        //     .catch((error) => console.log(error));
        setIsLoading(false);
        setPosts(result);
        setPostsToShow(result.slice(0, POST_PER_PAGE));
    };

    useEffect(() => {
        getData();
    }, []);
    console.log(postsToShow);

    /*
     * Loader showing
     *
     */

    if (isLoading) return <div>Please wait a moment.....</div>;
    /*
     * Content showing
     *
     */ else {
        return (
            <div className="container">
                {postsToShow.map((post) => {
                    return <PostItem post={post} key={post.id} />;
                })}
                <button onClick={handleShowMore}>Show More</button>
            </div>
        );
    }
};

export default PostList;
