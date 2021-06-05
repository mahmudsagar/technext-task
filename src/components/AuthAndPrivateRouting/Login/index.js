import React, { useState } from "react";
import { useHistory } from "react-router";
import { AuthContext, useGlobalContext } from "../../../Context/Context";
import './style.css'

const Login = () => {
    const { setCurrentUser, users, setIsLoggedIn } =
        useGlobalContext(AuthContext);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [isError, setIsError] = useState(false);
    const history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();
        let loggedInUser = {};
        loggedInUser = users.find(
            (user) => user.email === email && user.username === username
        );
        if (loggedInUser) {
            setIsLoggedIn(true);
            sessionStorage.setItem("currentUser", JSON.stringify(loggedInUser));
            setCurrentUser(JSON.parse(sessionStorage.getItem("currentUser")));
            history.push(`/user/${loggedInUser.id}`);
        } else {
            setIsError(true);
        }
    };
    return (
        <div className="container loginContainer">
            <div className="card">
                <h1 className={`text-center p-5 mb-5 display-6 text-capitalize`}>Let us know Who you are</h1>
                <small>You can use any user from jsonplaceholder user endpoint <br />
                but to make thing easy here is User 2:
                Username: Antonette, Email: Shanna@melissa.tv
                </small>
                {isError && (
                    <p className="text-center text-capitalize alert">
                        Worng username or email
                    </p>
                )}
                <div className="container">

                <div className="mb-3 row">
                        <label
                            htmlFor="inputUsername"
                            className="col-sm-3 col-form-label"
                        >
                            Username
                        </label>
                        <div className="col-sm-9">
                            {/* <small>Antonette</small> */}
                            <input
                                type="text"
                                className="form-control"
                                id="inputUsername"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div className="mb-3 row">
                        <label
                            htmlFor="email"
                            className="col-sm-3 col-form-label"
                        >
                            Email
                        </label>
                        <div className="col-sm-9">
                            {/* <small>Shanna@melissa.tv</small> */}
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className="col-auto">
                            <button
                                type="submit"
                                className="btn rounded-3 mb-3"
                                onClick={handleLogin}
                            >
                                Confirm identity
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
