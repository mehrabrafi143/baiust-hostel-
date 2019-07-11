import React, { Component } from "react";
import SideBar from "./../sidebar/sidebar";
import FoodIteFrom from "./foodItemForm/foodItemForm";
import { Route, Switch } from "react-router-dom";
import FoodItemTable from "./../foodTable/foodTable";

class Admin extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <SideBar />
          </div>
          <div className="col-8 ml-2 mt-5">
            <Switch>
              <Route path="/admin/addfood/:id" component={FoodIteFrom} />
              <Route path="/admin/food/addfood" component={FoodIteFrom} />
              <Route path="/admin/food/foodlist" component={FoodItemTable} />
              <Route path="/admin/food" exact component={FoodItemTable} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
