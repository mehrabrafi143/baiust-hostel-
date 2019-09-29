import React, { Component } from "react";
import SideBar from "./../sidebar/sidebar";
import FoodIteFrom from "./foodItemForm/foodItemForm";
import { Route, Switch, Redirect } from "react-router-dom";
import FoodItemTable from "./foodItemTable/foodItemTable";
import FoodMenu from "./foodmenu/foodMenu";
import MenuDetails from "./foodmenu/menuDetails/menuDetails";
import FoodMenuForm from "./foodMenuForm/foodMenuForm";
import RegistrationForm from "./../RegistrationForm/RegistrationForm";
import StudentForm from "./student/studentForm/studentForm";
import StudentList from "./student/studentList";
import MainNavBar from "../mainNavBar/mainnavbar";
import { getUserName } from "./../../service/authService/authService";
import DashBoard from "./dashBoard/dashBoard";
import StudentDetails from "./student/studentDetais";
import Account from "./account/account";
import StudentPayForm from "./student/studentPayForm/studentPayform";
import Notice from "./notice/notice";
import NoticeShow from "./notice/noticeShow";

class Admin extends Component {
  state = {};
  render() {
    const userName = getUserName();
    return (
      <div className="container-fluid">
        <MainNavBar username={userName} />
        <div className="row">
          <div className="col-2 margin-let-de">
            <SideBar />
          </div>
          <div className="col mt-5 ">
            <Switch>
              <Route path="/admin/dashboard" component={DashBoard} />
              <Route path="/admin/account" component={Account} />
              <Route path="/admin/addfood/:id" component={FoodIteFrom} />
              <Route path="/admin/addfood" component={FoodIteFrom} />
              <Route path="/admin/food" component={FoodItemTable} />
              <Route path="/admin/foodmenu/:id" exact component={MenuDetails} />
              <Route path="/admin/foodmenu" component={FoodMenu} />
              <Route path="/admin/addmenu/:id" component={FoodMenuForm} />
              <Route path="/admin/addmenu/" component={FoodMenuForm} />
              <Route path="/admin/addstudent" component={RegistrationForm} />
              <Route path="/admin/student/:id" component={StudentDetails} />
              <Route path="/admin/student" component={StudentList} />
              <Route path="/admin/notice/" component={Notice} />
              <Route path="/admin/noticeShow/" component={NoticeShow} />
              <Route path="/admin/pay/:id" component={StudentPayForm} />
              <Route path="/admin/studentform/:id" component={StudentForm} />
              <Redirect from="/admin" to="/admin/dashboard" exact />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
