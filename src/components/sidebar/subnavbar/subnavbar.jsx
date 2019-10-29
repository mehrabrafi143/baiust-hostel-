import React from "react";
import { NavLink } from "react-router-dom";
const SubNavBar = ({ child }) => {
  return (
    <ul>
      {child.map(c => (
        <li key={c.name}>
          <NavLink to={c.to}>
            <i className={c.icon + " icon-subnav"} /> {c.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default SubNavBar;
