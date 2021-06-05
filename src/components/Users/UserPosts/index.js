import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AuthContext, useGlobalContext } from "../../../Context/Context";
import TableHeader from "../../DataTableHelper/Header";
import  PostPaginationComponent  from '../../DataTableHelper/Pagination/PostPagination';
import './style.css'
const UserPosts = ({ id }) => {
    const { currentUser, isLoggedIn, currentPostPage, setCurrentPostPage } =
        useGlobalContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const ITEM_PER_PAGE = 5;
    useEffect(() => {
        const getUserPosts = () => {
            fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
                .then((response) => response.json())
                .then((result) => {
                    setPosts(result);
                });
        };
        getUserPosts();
        setCurrentPostPage(
            localStorage.getItem("currentPostPage")
                ? parseInt(localStorage.getItem("currentPostPage"))
                : 1
        );
    }, [id, setCurrentPostPage]);

    const headers = [
        { name: "Title", field: "title", sortable: false },
        { name: "Body", field: "body", sortable: false },
    ];
    const removeItem = (id) => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: "DELETE",
        }).then(() => setPosts(posts.filter((post) => post.id !== id)));
    };

    const postData = useMemo(() => {
        let computedPosts = posts;
        setTotalItems(posts.length);

        return computedPosts.slice(
            (currentPostPage - 1) * ITEM_PER_PAGE,
            (currentPostPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE
        );
    }, [posts, currentPostPage, ITEM_PER_PAGE]);

    return (
            <div className="container py-3">
                <div className="row">
                    <div className="user-post-table-header py-2">
                        <div className="row align-items-center">
                            <div className={`col-md-8`}>
                                <PostPaginationComponent
                                    total={totalItems}
                                    itemsPerPage={ITEM_PER_PAGE}
                                    currentPage={currentPostPage}
                                    onPageChange={(page) => {
                                        localStorage.setItem(
                                            "currentPostPage",
                                            page
                                        );
                                        setCurrentPostPage(page);
                                    }}
                                />
                            </div>
                            <div className={`col-md-4`}>
                                <Link
                                    to={`/new_post/`}
                                    className="btn btn-primary float-end"
                                >
                                    Create a new post
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <table className="table table-primary table-striped">
                        <TableHeader headers={headers} id={id} />
                        <tbody>
                            {postData.map((post, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <Link to={`/posts/${post.id}`}>
                                                {post.title}
                                            </Link>
                                        </td>
                                        <td>{post.body}</td>
                                        {isLoggedIn && currentUser.id === id && (
                                            <td>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <Link
                                                            to={`/edit_post/${post.id}`}
                                                        >
                                                            <FaEdit className="text-success"/>
                                                        </Link>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <FaTrashAlt
                                                            onClick={() =>
                                                                removeItem(
                                                                    post.id
                                                                )
                                                            }
                                                            className={`remove text-danger`}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
    );
};

export default UserPosts;
