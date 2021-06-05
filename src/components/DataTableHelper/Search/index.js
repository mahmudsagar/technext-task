import React, { useEffect, useState } from "react";

const Search = ({onSearch}) => {
    const [search, setSearch] = useState(localStorage.getItem("search")? localStorage.getItem("search") : '')

    const onInputChange=(value)=>{
        localStorage.setItem("search", value)
        localStorage.setItem('currentPage', "1")
        setSearch(value)
        onSearch(value)
    }
    useEffect(()=>{
        onSearch(localStorage.getItem("search"))    
    }, [])
    return (
        <input
            type="text"
            className="form-control"
            style={{ width: "240px" }}
            placeholder="Search"
            value={search}
            onChange={(e)=> onInputChange(e.target.value)}
        />
    );
};

export default Search;