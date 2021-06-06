import React, { useEffect, useMemo } from "react";
import { AuthContext, useGlobalContext } from "../../../Context/Context";

const PerPageItem = ({ onItemChange, totalItems }) => {
    const {itemPerPage, setItemPerPage} = useGlobalContext(AuthContext)

    const onChanging = (value) => {
        setItemPerPage(value);
        localStorage.setItem("itemPerPage", value);

        onItemChange(value ? value : 10);
    };
    useEffect(() => {
        // onItemChange(
        //     localStorage.getItem("itemPerPage")
        //         ? localStorage.getItem("itemPerPage")
        //         : 10
        // );
    }, []);
    const optionsForRows = useMemo(() => {
        const option = [];
        for (let i = 1; i <= totalItems; i++) {
            option.push(<option key={i}  value={i}>{i}</option>);
        }
        return option;
    }, [totalItems]);

    return (
        <select
            className="form-select"
            defaultValue={itemPerPage}
            onChange={(e) => onChanging(e.target.value)}
            aria-label="Default select"
        >
            <option value={totalItems}>
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
