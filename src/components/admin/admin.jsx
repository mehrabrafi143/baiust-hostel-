import React, { Component } from "react";
import SideBar from "./../sidebar/sidebar";
import FoodIteFrom from "./foodItemForm/foodItemForm";
import { Route, Switch } from "react-router-dom";
import FoodItemTable from "./foodItemTable/foodItemTable";
import FoodMenu from "./foodmenu/foodMenu";
import MenuDetails from "./foodmenu/menuDetails/menuDetails";
import FoodMenuForm from "./foodMenuForm/foodMenuForm";
import RegistrationForm from "./../RegistrationForm/RegistrationForm";
import StudentForm from "./student/studentForm/studentForm";
import StudentList from "./student/studentList";

class Admin extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <SideBar />
          </div>
          <div className="col mt-5 ">
            <Switch>
              <Route path="/admin/addfood/:id" component={FoodIteFrom} />
              <Route path="/admin/food/addfood" component={FoodIteFrom} />
              <Route path="/admin/food/foodlist" component={FoodItemTable} />
              <Route path="/admin/food" exact component={FoodItemTable} />
              <Route path="/admin/foodmenu" exact component={FoodMenu} />
              <Route path="/admin/foodmenu/:id" component={MenuDetails} />
              <Route path="/admin/addmenu/:id" component={FoodMenuForm} />
              <Route path="/admin/addmenu/" component={FoodMenuForm} />
              <Route path="/admin/addstudent" component={RegistrationForm} />
              <Route path="/admin/studentlist" component={StudentList} />
              <Route path="/admin/student" component={StudentList} />
              <Route path="/admin/studentform/:id" component={StudentForm} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
