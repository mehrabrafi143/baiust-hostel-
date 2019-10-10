import React from "react";
import { NavLink, Link } from "react-router-dom";
import SubNavBar from "../subnavbar/subnavbar";
const NavIem = ({ item, showItem }) => {
  const hasChild = item.child.length;
  return (
    <li>
      <NavLink to={item.to}>
        <span>
          <i className={item.icon + " icon-nav"} />
          {" " + item.name + " "}
          {hasChild ? (
            <i
              onClick={() => showItem(item)}
              className={item.iconClasses + " icon-arrow"}
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
