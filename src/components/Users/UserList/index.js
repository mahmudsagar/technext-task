import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext, useGlobalContext } from "../../../Context/Context";
import PaginationComponent from "../../DataTableHelper/Pagination";
import TableHeader from "../../DataTableHelper/TableHeader";
import PerPageItem from "../../DataTableHelper/ItemPerPage";
import Search from "../../DataTableHelper/Search";
import "./style.css";

const UserList = () => {
    const {
        users,
        currentPage,
        sorting,
        search,
        itemPerPage,
        setCurrentPage,
        setItemPerPage,
        setSearch,
        setSorting,
    } = useGlobalContext(AuthContext);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        setCurrentPage(
            localStorage.getItem("currentPage")
                ? parseInt(localStorage.getItem("currentPage"))
                : 1
        );
    }, []);
    // Fields that are to be shown on table Header
    const headers = [
        { name: "No#", field: "id", sortable: false },
        { name: "Name", field: "name", sortable: true },
        { name: "Email", field: "email", sortable: true },
        { name: "Website", field: "website", sortable: false },
    ];

    const usersData = useMemo(() => {
        let computedUsers = users;
        setTotalItems(users.length);
        // Shows item on either ascending or descending order depending on selection
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            let sortedData = [];
            sortedData = computedUsers.sort((a, b) =>
                typeof a[sorting.field] === "string"
                    ? reversed *
                      a[sorting.field].localeCompare(b[sorting.field])
                    : reversed * (a[sorting.field] - b[sorting.field])
            );
            localStorage.setItem("sortedItem", JSON.stringify(sortedData));
            console.log("sorting");
        }

        if (localStorage.getItem("sortedItem"))
            computedUsers = JSON.parse(localStorage.getItem("sortedItem"));
        // Shows searched Items if  seach input has a value
        if (search) {
            computedUsers = computedUsers.filter(
                (user) =>
                    user.name.toLowerCase().includes(search.toLowerCase()) ||
                    user.email.toLowerCase().includes(search.toLowerCase()) ||
                    user.website.toLowerCase().includes(search.toLowerCase())
            );
            setTotalItems(computedUsers.length);
        }
        //retun Items accroding to the selected number of rows
        return computedUsers.slice(
            (currentPage - 1) * itemPerPage,
            (currentPage - 1) * itemPerPage + itemPerPage
        );
    }, [users, currentPage, itemPerPage, search, sorting]);
    return (
        <div>
            <div className=" container py-3">
                <div className="row">
                    <div className="col-md-6">
                        <PaginationComponent
                            total={totalItems}
                            itemsPerPage={itemPerPage}
                            currentPage={currentPage}
                            onPageChange={(page) => {
                                localStorage.setItem("currentPage", page);
                                setCurrentPage(page);
                            }}
                        />
                    </div>
                    <div className="col-md-2">
                        <PerPageItem
                            onItemChange={(value) => {
                                setItemPerPage(parseInt(value));
                                setCurrentPage(1);
                                localStorage.setItem("currentPage", "1");
                            }}
                            totalItems={totalItems}
                        />
                    </div>
                    <div className="d-flex col-md-4 flex-row-reverse">
                        <Search
                            onSearch={(value) => {
                                setSearch(value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                </div>
                <div className="row">
                    <table>
                        {/* Table header is loading dynamically You can Find  DataTable Helper*/}
                        <TableHeader
                            headers={headers}
                            onSorting={(field, order) =>
                                setSorting({ field, order })
                            }
                        />
                        {/* List of Users on table */}
                        <tbody>
                            {usersData.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row" className="text-center">
                                            {user.id}
                                        </th>
                                        <td>
                                            <Link
                                                to={`/user/${user.id}`}
                                                onClick={() => {
                                                    localStorage.removeItem(
                                                        "currentPostPage"
                                                    );
                                                    window.scrollTo(0, 0);
                                                }}
                                            >
                                                {user.name}
                                            </Link>
                                        </td>
                                        <td>{user.email}</td>
                                        <td>{user.username}</td>
                                        <td>{user.website}</td>
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

export default UserList;
