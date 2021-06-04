import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PaginationComponent from "../../DataTable/Pagination";
import TableHeader from "../../DataTable/Header/index";
import { AuthContext, useGlobalContext } from "../../../Context/Context";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const UserPosts = ({ id }) => {
    const { currentUser, isLoggedIn, currentPage, setCurrentPage } =
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
        setCurrentPage(
            localStorage.getItem("currentPage")
                ? parseInt(localStorage.getItem("currentPage"))
                : 1
        );
    }, [id, setCurrentPage]);

    const headers = [
        { name: "No#", field: "id", sortable: false },
        { name: "Title", field: "title", sortable: false },
        { name: "body", field: "body", sortable: false },
    ];

    const postData = useMemo(() => {
        let computedPosts = posts;
        setTotalItems(posts.length);

        return computedPosts.slice(
            (currentPage - 1) * ITEM_PER_PAGE,
            (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE
        );
    }, [posts, currentPage, ITEM_PER_PAGE]);
    // console.log(posts);
    return (
        <div>
            <div className="container py-3">
                <div className="row">
                    <div className={`col-md-12`}>
                        <PaginationComponent
                            total={totalItems}
                            itemsPerPage={ITEM_PER_PAGE}
                            currentPage={currentPage}
                            onPageChange={(page) => {
                                localStorage.setItem("currentPage", page);
                                setCurrentPage(page);
                            }}
                        />
                    </div>
                </div>
                <div className="row">
                    <table className="table table-striped">
                        <TableHeader headers={headers} />
                        <tbody>
                            {postData.map((post, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row" className="text-center">
                                            {index + 1}
                                        </th>
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
                                                        <FaEdit />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <FaTrashAlt />
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
        </div>
    );
};

export default UserPosts;
