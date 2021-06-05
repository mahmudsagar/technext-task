import React, { useEffect, useMemo, useState } from "react";

const PerPageItem = ({ onItemChange, totalItems }) => {
    const [itemPerPage, setItemPerPage] = useState(
        localStorage.getItem("itemPerPage")
            ? localStorage.getItem("itemPerPage")
            : ""
    );

    const onChanging = (value) => {
        setItemPerPage(value);
        localStorage.setItem("itemPerPage", value);
        onItemChange(value ? value : 50);
    };
    useEffect(() => {
        onItemChange(
            localStorage.getItem("itemPerPage")
                ? localStorage.getItem("itemPerPage")
                : 50
        );
    }, []);
    const optionsForRows = useMemo(() => {
        const option = [];
        for (let i = 1; i <= totalItems; i++) {
            option.push(<option selected={parseInt(itemPerPage) === i} value={i}>{i}</option>);
        }
        return option;
    }, [totalItems]);

    return (
        <select
            className="form-select"
            value={itemPerPage}
            onChange={(e) => onChanging(e.target.value)}
            aria-label="Default select"
        >
            <option selected value={totalItems}>
                All
            </option>
            {optionsForRows}
        </select>
        // <input
        //     type="number"
        //     className="form-control"
        //     style={{ width: "240px" }}
        //     placeholder="Select number Of row"
        //     value={itemPerPage}
        //     min="1"
        //     onChange={(e) => onChanging(e.target.value)}
        // />
    );
};

export default PerPageItem;
