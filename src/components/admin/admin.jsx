import React, { Component } from "react";
import SideBar from "./../sidebar/sidebar";
import FoodIteFrom from "./foodItemForm/foodItemForm";
import { Route, Switch } from "react-router-dom";
import FoodItemTable from "./../foodTable/foodTable";

class Admin extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <SideBar />
        <Route path="/admin/addfood" component={FoodIteFrom} />
        <Route path="/admin/foodlist" component={FoodItemTable} />
      </React.Fragment>
    );
  }
}

export default Admin;
