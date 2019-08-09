import React from "react";
import { Link } from "react-router-dom";
import { getUserName } from "./../../../service/authService/authService";
const UserNavbar = () => {
  const username = getUserName();
  return (
    <nav className="navbar navbar-expand-lg usernavbar">
      <Link className="navbar-brand margin-left" href="#">
        Navbar
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fa fa-bars" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav right-align">
          <li className="nav-item active">
            <Link className="nav-link" href="#">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="#">
              Features
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="#">
              Pricing
            </Link>
          </li>
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {username}
            </Link>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <Link className="dropdown-item" href="#">
                Action
              </Link>
              <Link className="dropdown-item" href="#">
                Another action
              </Link>
              <Link className="dropdown-item" to="/logout">
                Logout
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default UserNavbar;
