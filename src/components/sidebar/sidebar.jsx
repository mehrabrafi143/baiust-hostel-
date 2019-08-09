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
        to: "/admin/dashboard"
      },
      {
        name: "Account Information",
        icon: "fa fa-info",
        child: [],
        to: "/admin/account/"
      },
      {
        name: "Student Information",
        icon: "fa fa-info",
        child: [
          {
            name: "Students List",
            icon: "fa fa-list",
            to: "/admin/studentlist"
          },
          {
            name: "Register Student",
            icon: "fa fa-user",
            to: "/admin/addstudent"
          }
        ],
        show: false,
        to: "/admin/student"
      },
      {
        name: "Food Menu",
        icon: "fa fa-list-alt",
        child: [
          { name: "Menu List", icon: "fa fa-list", to: "/admin/foodmenu" },
          { name: "Add Menu", icon: "fa fa-plus-circle", to: "/admin/addmenu" }
        ],
        show: false,
        to: "/admin/foodmenu"
      },
      {
        name: "Food Item",
        icon: "fa fa-cutlery",
        child: [
          {
            name: "Food List",
            to: "/admin/food",
            icon: "fa fa-plus-circle"
          },
          { name: "Add Food", to: "/admin/addfood", icon: "fa fa-list" }
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
            <NavIem key={i.name} item={i} showItem={this.handelShow} />
          ))}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
