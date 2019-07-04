import React from "react";
import { NavLink } from "react-router-dom";

const MainNavBar = () => {
  return (
    <nav className="navbar shadow ">
      <div className="col-3" />
      <div className="col-4 center" />
      <ul className="col-4 left-nav">
        <li>
          <a href="#">
            <i className="fa fa-globe" />
          </a>
        </li>
        <li>
          <a href="#">Hellow User Name</a>
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
