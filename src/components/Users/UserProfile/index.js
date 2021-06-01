import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import {AuthContext, useGlobalContext} from "../../../Context/Context";

const UserProfile = () => {
    const {isLoggedIn, users} = useGlobalContext(AuthContext)
    const {id} = useParams()
    const [user, setUser] = useState([])

    useEffect(()=>{
        if(isLoggedIn){
            setUser(sessionStorage("currentUser"))
        }

    })
    console.log(isLoggedIn)
    return (
        <div>
            <h2>{user.name}</h2>
        </div>
    );
};

export default UserProfile;