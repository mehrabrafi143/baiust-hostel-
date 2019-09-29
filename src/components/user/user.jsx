import React, { Component } from "react";
import UserNavbar from "./userNavbar/userNavbar";
import UserRoute from "./../protectedRoute/userRoute";
import { Switch } from "react-router-dom";
import { GetStudent } from "../../service/studentServices/studentServices";
import { getUserName } from "../../service/authService/authService";
import UserMenuCards from "./userMenuCard/userMenuCards";
import MenuDetailsUser from "./userDetailMenucard/menuDetailsUser";
import MyProfile from "./myprofile/myprofile";
import UserHome from "./UserHome/UserHome";
import Hero from "./hero/hero";
import UserNotice from "./userNotice/userNotice";
import NoticeDetails from "./userNotice/userNoticeDetails";
import ChangePassword from "./../common/changePassword/changePassword";
class User extends Component {
  state = {
    student: {},
    username: ""
  };

  async componentDidMount() {
    const username = getUserName();
    const { data: student } = await GetStudent(username);
    this.setState({ student, username });
    localStorage.setItem("id", student.roll);
    localStorage.setItem("studentId", student.id);
  }

  render() {
    const { username, student } = this.state;

    return (
      <React.Fragment>
        <UserNavbar username={username} />
        <Hero />
        <Switch>
          <UserRoute path="/user" exact component={UserHome} />
          <UserRoute path="/user/meal/:id" component={MenuDetailsUser} />
          <UserRoute path="/user/notice/:id" component={NoticeDetails} />
          <UserRoute path="/user/notice" component={UserNotice} />
          <UserRoute path="/user/myprofile" component={MyProfile} />
          <UserRoute path="/user/changepassword" component={ChangePassword} />
          <UserRoute
            path="/user/meal/"
            render={props => (
              <UserMenuCards studentId={student.id} {...props} />
            )}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default User;
