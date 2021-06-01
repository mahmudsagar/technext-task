import React from 'react';

const CommentDetails = ({details}) => {
    const {name, email, body} = details
    return (
        <div>
            <h3>{name}</h3>
            <small>{email}</small>
            <p>{body}</p>
        </div>
    );
};

export default CommentDetails;