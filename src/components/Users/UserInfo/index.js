import React from "react";

const UserInfo = ({ user }) => {
    return (
        <div className="card">
            <h1
                style={{
                    color: "#6c757d",
                    textShadow: "0 0 3px #ddd",
                    WebkitTextStroke: "2px #343a40",
                }}
            >
                About {user?.name}
            </h1>
            <div className="card-body">
                <div className="card-title">
                    <h3>Name: {user?.name}</h3>
                    <p>Email: {user?.email}</p>
                </div>
                <div className="card-text">
                    <h4>Contact info</h4>
                    <hr />
                    <p>
                        Phone Number: <strong>{user?.phone}</strong>
                    </p>
                    <p>
                        Website: <strong>{user?.website}</strong>
                    </p>
                    <h6>Address: </h6>
                    <p>
                        Suite: <strong>{user?.address?.suite}</strong>, Street:{" "}
                        <strong>{user?.address?.street}</strong>{" "}
                    </p>
                    <p>
                        City: <strong>{user?.address?.city}</strong>, Zip code:{" "}
                        <strong>{user?.address?.zipcode}</strong>{" "}
                    </p>
                </div>
                <div className="card-text">
                    <h4>Proffesional info</h4>
                    <hr />
                    <p>
                        Comapny Name: <strong>{user?.company?.name}</strong>
                    </p>
                    <p>
                        Catch Phrase:{" "}
                        <strong>{user?.company?.catchPhrase}</strong>
                    </p>
                    <p>
                        BS: <strong>{user?.company?.bs}</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
