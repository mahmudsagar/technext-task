import React from "react";
import { Link } from "react-router-dom";
import { AuthContext, useGlobalContext } from "../../../Context/Context";
import {GrClose} from 'react-icons/gr'
import "./style.css";
const SideNavigation = () => {
    const {topbarHeight , showSidebar,setShowSidebar } = useGlobalContext(AuthContext);
    return (
        <aside
            className={`sidebar navbar-expand-lg navbar-light ${
                showSidebar && "showSidNavigation"
            }`}
            style={{top: topbarHeight / 16 + "rem",}}
        >
            <div className="container">
                <div className="py-2">
                    <GrClose className="sidebarClose" onClick={()=> setShowSidebar(false)}/>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link
                                className="nav-link active"
                                aria-current="page"
                                to="#"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">
                                Link
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default SideNavigation;
