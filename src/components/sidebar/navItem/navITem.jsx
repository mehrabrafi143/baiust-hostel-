import React from "react";
import { NavLink, Link } from "react-router-dom";
import SubNavBar from "../subnavbar/subnavbar";
const NavIem = ({ item, showItem }) => {
  const hasChild = item.child.length;
  return (
    <li>
      <NavLink to={item.to}>
        <span>
          <i className={item.icon} />
          {" " + item.name + " "}
          {hasChild ? (
            <i
              onClick={() => showItem(item)}
              className="fa fa-plus-square-o"
              aria-hidden="true"
            />
          ) : null}
        </span>
      </NavLink>
      {hasChild && item.show ? <SubNavBar child={item.child} /> : null}
    </li>
  );
};

export default NavIem;
