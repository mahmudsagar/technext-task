import React from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext, useGlobalContext } from "../../../Context/Context";
import { GrClose } from "react-icons/gr";
import "./style.css";
const SideNavigation = () => {
    const { topbarHeight, showSidebar, setShowSidebar, currentUser } =
        useGlobalContext(AuthContext);
    return (
        <aside
            className={`sidebar navbar-expand-lg ${
                showSidebar && "showSidNavigation"
            }`}
            style={{ top: topbarHeight / 16 + "rem" }}
        >
            <div className="container">
                <div className="py-2">
                    <GrClose
                        className="sidebarClose"
                        onClick={() => setShowSidebar(false)}
                    />
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                activeClassName="active"
                                aria-current="page"
                                exact
                                to="/"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                activeClassName="active"
                                className="nav-link"
                                to={`/user/${currentUser?.id}`}
                                onClick={() =>
                                    localStorage.removeItem("currentPostPage")
                                }
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                activeClassName="active"
                                className="nav-link"
                                to={`/new_post`}
                            >
                                Create Post
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default SideNavigation;
