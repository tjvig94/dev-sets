import React from "react";
import { Link } from "react-router-dom";
import { HOME_PATH, USER_PATH } from "../../views"
import "./navBar.css";



function NavBar() {

    return (

        <div class="topnav">
            <Link as={Link} to={HOME_PATH}>Home</Link>
            {/* <Link href="#Discover">Discover</Link> */}
            <Link as={Link} to={USER_PATH}>Profile</Link>
            <input type="text" placeholder="Search.."></input>
        </div>
    )
}

export default NavBar;