import React from "react";
import { Link } from "react-router-dom";

const MainNavBar = ({ username }) => {
  return (
    <nav className="Customenavbar shadow ">
      <ul className="col-4 left-nav">
        {username && (
          <React.Fragment>
            <li>
              <Link to="">
                <i className="fa fa-globe" />
              </Link>
            </li>
            <li>
              <Link to="">Hellow {username}</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
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
