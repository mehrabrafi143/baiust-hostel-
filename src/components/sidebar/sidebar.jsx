import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavIem from "./navItem/navITem";

class Sidebar extends Component {
  state = {
    navItem: [
      {
        name: "Dashboard",
        child: [],
        icon: "fa fa-home fa-lg",
        show: false,
        to: "/admin/dashboard",
        iconClasses: "fa fa-sort-desc text-right-icon"
      },
      {
        name: "Account Information",
        icon: "fa fa-info fa-lg",
        child: [
          {
            name: "Informations",
            icon: "fa fa-list ",
            to: "/admin/account"
          },
          {
            name: "Monthly Price",
            icon: "fa fa-user ",
            to: "/admin/monthlyBill"
          }
        ],
        to: "/admin/account/",
        iconClasses: "fa fa-sort-desc text-right-icon"
      },
      {
        name: "Student Information",
        icon: "fa fa-info fa-lg",
        child: [
          {
            name: "Students List",
            icon: "fa fa-list ",
            to: "/admin/student"
          },
          {
            name: "Register Student",
            icon: "fa fa-user ",
            to: "/admin/addstudent"
          }
        ],
        show: false,
        to: "/admin/student",
        iconClasses: "fa fa-sort-desc text-right-icon"
      },
      {
        name: "Food Menu",
        icon: "fa fa-list-alt fa-lg",
        child: [
          { name: "Menu List", icon: "fa fa-list", to: "/admin/foodmenu" },
          { name: "Add Menu", icon: "fa fa-plus-circle", to: "/admin/addmenu" }
        ],
        show: false,
        to: "/admin/foodmenu",
        iconClasses: "fa fa-sort-desc text-right-icon"
      },
      {
        name: "Food Item",
        icon: "fa fa-cutlery fa-lg",
        child: [
          {
            name: "Food List",
            to: "/admin/food",
            icon: "fa fa-plus-circle"
          },
          { name: "Add Food", to: "/admin/addfood", icon: "fa fa-list" }
        ],
        show: false,
        to: "/admin/food",
        iconClasses: "fa fa-sort-desc text-right-icon"
      },
      {
        name: "Site Management",
        icon: "fa fa-building fa-lg",
        child: [
          {
            name: "Sit Informations",
            to: "/admin/sits",
            icon: "fa fa-map"
          },
          { name: "Add Sit", to: "/admin/sitsform", icon: "fa fa-plus-circle" }
        ],
        show: false,
        to: "/admin/sits",
        iconClasses: "fa fa-sort-desc text-right-icon"
      }
    ]
  };

  handelShow = input => {
    const navItem = [...this.state.navItem];
    const index = navItem.findIndex(i => i.name === input.name);
    const item = { ...navItem[index] };

    item.show = !item.show;

    if (item.iconClasses === "fa fa-sort-desc text-right-icon")
      item.iconClasses = "fa fa-sort-asc text-down-icon";
    else item.iconClasses = "fa fa-sort-desc text-right-icon";

    navItem[index] = item;

    this.setState({ navItem });
  };

  render() {
    return (
      <div className="sidebar">
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
