import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavIem from "./navItem/navITem";

class Sidebar extends Component {
  state = {
    classes: "",
    navItem: [
      {
        name: "Dashboard",
        child: [],
        icon: "fa fa-home",
        show: false,
        to: "/admin"
      },
      {
        name: "Account Information",
        icon: "fa fa-info",
        child: [],
        to: ""
      },
      {
        name: "Student Information",
        icon: "fa fa-info",
        child: [
          { name: "Register Student", icon: "fa fa-user" },
          { name: "Students List", icon: "fa fa-list" }
        ],
        show: false,
        to: ""
      },
      {
        name: "Food Menu",
        icon: "fa fa-list-alt",
        child: [
          { name: "Add Menu", icon: "fa fa-plus-circle" },
          { name: "Menu List", icon: "fa fa-list" }
        ],
        show: false,
        to: ""
      },
      {
        name: "Food Item",
        icon: "fa fa-cutlery",
        child: [
          {
            name: "Food List",
            to: "/admin/food/foodlist",
            icon: "fa fa-plus-circle"
          },
          { name: "Add Food", to: "/admin/food/addfood", icon: "fa fa-list" }
        ],
        show: false,
        to: "/admin/food"
      }
    ]
  };

  handelShow = input => {
    const navItem = [...this.state.navItem];
    const index = navItem.findIndex(i => i.name === input.name);
    const item = { ...navItem[index] };
    item.show = !item.show;
    navItem[index] = item;
    this.setState({ navItem });
  };

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-logo">
          <Link to="/admin">BAIUST HOSTEL</Link>
        </div>
        <ul>
          {this.state.navItem.map(i => (
            <NavIem key={i.id} item={i} showItem={this.handelShow} />
          ))}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
