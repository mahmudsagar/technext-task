import React, { useEffect, useState } from "react";
import { AuthContext, useGlobalContext } from "../../../Context/Context";
import PostItem from "../PostItem";
import "./style.css";

const PostList = () => {
    const { topbarHeight, showSidebar } = useGlobalContext(AuthContext);

    // posts
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // controll amount of post to show on a page output
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
        setIsLoading(false);
        setPosts(result);
        setPostsToShow(result.slice(0, POST_PER_PAGE));
    };

    useEffect(() => {
        getData();
    }, []);

    // Fetching data to set input value initially in case of update
    const wrapperPosition = {
        marginTop: topbarHeight / 16 + 3 + "rem",
        marginLeft: `${showSidebar ? "13rem" : "1rem"}`,
        width: `${showSidebar ? "calc(100% - 240px)" : "calc(100% - 50px)"}`,
        transition: "all ease-in-out .5s",
    };

    if (isLoading)
        return (
            <div style={wrapperPosition} className="wrapper">
                Please wait a moment.....
            </div>
        );
    else {
        return (
            <div style={wrapperPosition} className="wrapper">
                <div className="container">
                    {/**
                     *  lIST OF all Posts 
                     * 10 at a time 
                     * Can icrease the item bu Clicking Show more 
                     * */}
                    {postsToShow.map((post) => {
                        return <PostItem post={post} key={post.id} />;
                    })}
                    <div className="text-center">
                        <button
                            onClick={handleShowMore}
                            className="btn btn-outline-success btn-primary rounded-pill mb-5 px-4 py-2 text-center text-white"
                        >
                            Show More
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

export default PostList;
