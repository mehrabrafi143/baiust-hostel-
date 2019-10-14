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
import Sits from "./sit/sits";
import SitForm from "./sit/sitForm";
import ElectricBill from "./sit/electricBill/electricBill";
import MonthlyBill from "./monthlyBill/monthlyBill";
import ChangePasswordAdmin from "./../common/changePassword/changePasswordAdmin";
import { AddStudentMonthlyBills } from "../../service/monthlyBillService/monthlyBillService";

class Admin extends Component {
  state = {};
  async componentDidMount() {
    const d = new Date();
    const date = d.getDate();
    if (date === 1) {
      await AddStudentMonthlyBills();
    }
  }
  render() {
    const userName = getUserName();
    return (
      <div className="full-width">
        <MainNavBar username={userName} />
        <div className="width-sidebar">
          <SideBar />
        </div>
        <div className="width-body">
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
            <Route path="/admin/sits" component={Sits} />
            <Route path="/admin/sitsForm/:id" component={SitForm} />
            <Route path="/admin/sitsForm" component={SitForm} />
            <Route path="/admin/electrilbill/:id" component={ElectricBill} />
            <Route path="/admin/monthlyBill" component={MonthlyBill} />
            <Route path="/admin/password" component={ChangePasswordAdmin} />
            <Redirect from="/admin" to="/admin/dashboard" exact />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Admin;
