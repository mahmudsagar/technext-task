import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

const PostItem = ({ post }) => {
    console.log(post);
    const { id, title, body } = post;
    return (
        <div className="card bg-fuchsia">
            <span className="h3">
            {id}
            </span>
                <Link
                    to={`/posts/${id}`}
                    className="card-title h4"
                >
                Title: {title}
                </Link>
            <p className="card-text">{`${body.substring(0,100)}....`}</p>
        </div>
    );
};

export default PostItem;
