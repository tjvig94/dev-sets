import React from "react";
import { Link } from "react-router-dom";
import { HOME_PATH, USER_PATH, LOGIN_PATH } from "../../views"
import "./navBar.css";



function NavBar() {

    return (

        <div className="topnav">
            <Link as={Link} to={HOME_PATH}>Home</Link>
            <Link as={Link} to={LOGIN_PATH}>Log In</Link>
            <Link as={Link} to={USER_PATH}>Profile</Link>
            <input type="text" placeholder="Search.."></input>
        </div>
    )
}

export default NavBar;