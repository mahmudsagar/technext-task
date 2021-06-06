import React, {useEffect, useState} from 'react'
import CommentDetails from "./Comment";

const Comments = ({id}) => {
    const [comment, setComment] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const getComments = async () => {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/posts/${id}/comments`
            );
            const result = await response.json();
            setIsLoading(false)
            setComment(result);
        };
        getComments()
    },[id])
    if (isLoading) return <div>Showing the Comments.....</div>;

    return (
        <div>
            {comment.map((details)=>{
                return <CommentDetails key={details.id} details={details}/>
            })}
        </div>

    )
}

export default Comments
