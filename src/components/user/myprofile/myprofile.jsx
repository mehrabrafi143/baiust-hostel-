import React, { Component } from "react";
import Spiner from "../../spiner/spiner";
import { getUserName } from "./../../../service/authService/authService";
import { GetStudent } from "./../../../service/studentServices/studentServices";
import { Link } from "react-router-dom";

class MyProfile extends Component {
  state = {
    student: {},
    loader: false
  };

  async componentDidMount() {
    try {
      this.setState({ loader: true });
      const username = getUserName();
      const { data: student } = await GetStudent(username);
      if (student) this.setState({ student, loader: false });
    } catch (error) {
      this.setState({ loader: false });
    }
  }

  render() {
    const { student, loader } = this.state;
    return (
      <div className="user-section">
        <Spiner loader={loader} />
        <div className="container">
          <div className="row">
            <div className="col-3 animated bounceInDown">
              <div className="div roundedImg">
                <i className="fa fa-user profile" aria-hidden="true"></i>
              </div>
            </div>
            <div className="col-6">
              <ul className="info animated bounceInRight">
                <li className="text-info">
                  <h1>Name:</h1> <span>{student.name}</span>
                </li>
                <li className="text-info">
                  <h1>ID:</h1> <span>{student.roll}</span>
                </li>
                <li className="text-info">
                  <h1>Department:</h1> <span>{student.dept}</span>
                </li>
                <li className="text-info">
                  <h1>Paid Amount:</h1> <span>{student.paidAmount}</span>
                </li>
                <li className="text-info">
                  <h1>Deu Amount</h1> <span>{student.deuAmount}</span>
                </li>
                <li className="text-info">
                  <h1>Room Number:</h1> <span>{student.roomNo}</span>
                </li>
                <li className="text-info">
                  <h1>Address:</h1>
                  <span> {student.address}</span>
                </li>
                <li className="text-info">
                  <h1>Entry Data:</h1> <span>{student.addedTime}</span>
                </li>
                <li className="text-info">
                  <h1>Phone Number:</h1> <span>{student.phoneNumber}</span>
                </li>
              </ul>
            </div>
            <div className="col-3">
              <Link to="/user/changePassword" className="changePasswrod mr-5">
                Change Passwrod
                <i className="fa fa-key ml-3" aria-hidden="true"></i>
              </Link>
              <span className="badge badge-pill badge-info text-sm">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyProfile;
