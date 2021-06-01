import React, {useEffect, useState} from 'react'
import CommentDetails from "./Comment";

const Comments = ({id}) => {
    const [comment, setComment] = useState([])
    const getComments = async () => {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        );
        const result = await response.json();
        setComment(result);
    };
    useEffect(()=>{
        getComments()
    },[])
    return (
        <div>
            {comment.map((details)=>{
                return <CommentDetails key={details.id} details={details}/>
            })}
        </div>

    )
}

export default Comments
