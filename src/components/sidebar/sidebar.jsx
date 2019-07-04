import React from "react";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="brand">
        <div className="text-brand">
          Baiust <span>Hostel</span>
        </div>
      </div>
      <ul>
        <li>
          <i className="fa fa-home" />
          <a href="/">DashBoard</a>
        </li>
        <li>
          <i className="fa fa-user" />
          <a href="/students">Students Information</a>
        </li>
        <li>
          <i className="fa fa-info" />
          <a href="">Account Infromation</a>
        </li>
        <li>
          <i className="fa fa-cutlery" />
          <a href="">Food Menu</a>
        </li>
        <li>
          <i className="fa fa-glass" />
          <a href="">Food Items</a>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
