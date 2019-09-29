import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import Modal from "./modal/modal";
import { GetNotifications } from "./../../../service/notificationServices/notificationServices";

class UserNavbar extends Component {
  state = {
    notifications: [],
    count: 0
  };

  componentDidMount = async () => {
    try {
      const id = localStorage.getItem("studentId");
      const { data: notifications } = await GetNotifications(id);
      const count = notifications.length;
      this.setState({ notifications, count });
    } catch (error) {}
  };

  setCount = () => {
    this.setState({ count: 0 });
  };

  render() {
    const { notifications, count } = this.state;
    return (
      <nav className="navbar navbar-expand-lg usernavbar">
        <Link to="" className="navbar-brand margin-left">
          BAIUST HOSTEL
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
            {notifications ? (
              <Modal
                notifications={notifications}
                count={count}
                setCount={this.setCount}
              />
            ) : null}
            <li className="nav-item ">
              <NavLink className="nav-link" to="/user/meal">
                Take Meal
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to=""
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {this.props.username}
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <Link className="dropdown-item" to="/user/myprofile">
                  My Profile
                </Link>
                <Link className="dropdown-item" to="/user/notice">
                  Notice Board
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
  }
}

export default UserNavbar;
