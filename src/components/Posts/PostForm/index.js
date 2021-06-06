import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext, useGlobalContext } from "../../../Context/Context";
import Alert from "./Alert";

const PostForm = () => {
    const { id } = useParams();
    const { topbarHeight, showSidebar, currentUser } =
        useGlobalContext(AuthContext);
    const [result, setResult] = useState({});
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [alert, setAlert] = useState({
        show: false,
        msg: "",
        type: "",
    });
    const [success, setSuccess] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title && !body) {
            showAlert(true, "danger", "please enter a value");
        } else if (title && body && id) {
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: "PUT",
                body: JSON.stringify({
                    id: id,
                    title: title,
                    body: body,
                    userId: currentUser.id,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    setSuccess(true);
                    setResult(json);
                });
            setTitle("");
            setBody("");
            showAlert(true, "success", "value changed");
        } else {
            fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    body: body,
                    userId: currentUser.id,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    setResult(json);
                });
            setSuccess(true);
            setTitle("");
            setBody("");
            showAlert(true, "success", "New Post Created");
        }
    };
    const showAlert = (show = false, type = "", msg = "") => {
        setAlert({ show, type, msg });
    };
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((response) => response.json())
            .then((json) => {
                setTitle(json.title);
                setBody(json.body);
            });
    }, [id]);

    const wrapperPosition = {
        marginTop: topbarHeight / 16 + 3 + "rem",
        marginLeft: `${showSidebar ? "13rem" : "1rem"}`,
        width: `${showSidebar ? "calc(100% - 240px)" : "calc(100% - 50px)"}`,
        transition: "all ease-in-out .5s",
    };
    return (
        <div className={`wrapper`} style={wrapperPosition}>
            {alert.show && <Alert {...alert} removeAlert={showAlert} />}
            <h3>{id ? "Edit" : "Create"} Post</h3>
            <form className="form-control" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={`Enter the title of your post`}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="exampleFormControlTextarea1"
                        className="form-label"
                    >
                        Description
                    </label>
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        placeholder={`Enter the title of your post`}
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                </div>
                <button type={`submit`} className="btn bg-primary text-white">
                    {id ? "edit" : "submit"}
                </button>
            </form>
            {success && (
                <div className="result bg-primary mt-4 p-3 rounded">
                    <p className="text-warning">
                        {id ? "Updated Post" : "Created Post"}
                    </p>
                    <h3>Title: {result?.title}</h3>
                    <h3>Description: {result?.body}</h3>
                </div>
            )}
        </div>
    );
};

export default PostForm;
