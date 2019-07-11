import React from "react";
import { Link } from "react-router-dom";
const SubNavBar = ({ child }) => {
  return (
    <ul>
      {child.map(c => (
        <li key={c.name}>
          <Link to={c.to}>
            <i className={c.icon} /> {c.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SubNavBar;
