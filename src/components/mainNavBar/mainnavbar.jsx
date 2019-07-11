import React from "react";
import { Link, NavLink } from "react-router-dom";

const MainNavBar = () => {
  return (
    <nav className="navbar shadow ">
      <div className="col-3" />
      <div className="col-4 center" />
      <ul className="col-4 left-nav">
        <li>
          <Link to="">
            <i className="fa fa-globe" />
          </Link>
        </li>
        <li>
          <Link to="">Hellow User Name</Link>
        </li>
        <li>
          <NavLink to="/registration">Register</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavBar;
