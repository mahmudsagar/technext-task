import React, { useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { AuthContext, useGlobalContext } from "../../../Context/Context";
const TableHeader = ({ headers, onSorting, id }) => {
    const { currentUser, sortingOrder, setSortingOrder } = useGlobalContext(AuthContext);
    const [sortingField, setSortingField] = useState("");
    //HAndling ascending & descending Order Sorting
    const onSortingChange = (field) => {
        const order =
            field === sortingField && sortingOrder === "asc" ? "desc" : "asc";
        setSortingField(field);
        setSortingOrder(order);
        localStorage.setItem("order", order);
        onSorting(field, order);
    };

    return (
        <thead className="text-center">
            <tr>
                {headers.map(({ name, field, sortable }, index) => (
                    <th
                        key={index}
                        onClick={() =>
                            sortable ? onSortingChange(field) : null
                        }
                    >
                        {name}
                    {/* show Sort icon */}
                        {sortable &&
                            (localStorage.getItem("order") === "desc" ? (
                                <BsArrowUp />
                            ) : (
                                <BsArrowDown />
                            ))}
                    </th>
                ))}
                {/* show updat and delete actions if list belongs to is current user                  */}
                {currentUser.id === id && <th>Action</th>}
            </tr>
        </thead>
    );
};

export default TableHeader;
