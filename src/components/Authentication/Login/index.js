import React, {useState} from 'react';
import {useHistory} from 'react-router';
import {AuthContext, useGlobalContext} from "../../../Context/Context";

const Login = () => {
    const {setCurrentUser, users, setIsLoggedIn} = useGlobalContext(AuthContext)
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [isError, setIsError] = useState(false)
    const history = useHistory()


    const handleLogin = (e) => {
        e.preventDefault()
        let loggedInUser = {};
        loggedInUser = users.find((user) => user.email === email && user.username === username)
        if (loggedInUser) {
            setIsLoggedIn(true);
            sessionStorage.setItem("currentUser", JSON.stringify(loggedInUser))
            setCurrentUser(JSON.parse(sessionStorage.getItem("currentUser")))
            history.push(`/user/${loggedInUser.id}`)
        } else {
            setIsError(true)
        }
    }
    return (
        <div>
            <h1 className={`text-center`}>Let us know Who you are</h1>
            {isError&& <p className="text-danger text-center">Worng userna or email</p>}
            <div className="mb-3 row">
                <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                    <small>Shanna@melissa.tv</small>
                    <input type="text" className="form-control" id="email"
                           value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="inputUsername" className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                    <small>Antonette</small>
                    <input type="text" className="form-control" id="inputUsername" value={username}
                           onChange={(e) => setUsername(e.target.value)}/>
                </div>
            </div>
            <div className="mb-3 row">
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary mb-3" onClick={handleLogin}>Confirm identity
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;