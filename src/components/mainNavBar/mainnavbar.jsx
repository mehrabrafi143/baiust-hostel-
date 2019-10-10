import React from "react";
import { Link } from "react-router-dom";

const MainNavBar = ({ username }) => {
  return (
    <nav className="main-nav">
      <div className="main-nav_logo">
        <Link>Baiust Hostel</Link>
      </div>
      <ul className="col-4 left-nav">
        {username && (
          <React.Fragment>
            <li>
              <Link to="">
                <i class="fa fa-user" aria-hidden="true"></i> Hellow Admin
              </Link>
            </li>
            <li>
              <Link to="">
                <i class="fa fa-key" aria-hidden="true"></i> Change Password
              </Link>
            </li>
            <li>
              <Link to="/logout">
                <i class="fa fa-sign-out" aria-hidden="true"></i> Logout
              </Link>
            </li>
          </React.Fragment>
        )}
        {!username && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MainNavBar;
