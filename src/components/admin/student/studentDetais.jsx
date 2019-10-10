import React, { Component } from "react";
import { GetStudentById } from "../../../service/studentServices/studentServices";
import Spiner from "./../../spiner/spiner";
import { DeleteStudent } from "./../../../service/studentServices/studentServices";
import bootbox from "bootbox";
class StudentDetails extends Component {
  state = {
    student: {},
    gender: "",
    loader: false,
    roomNo: ""
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    this.setState({ loader: true });
    try {
      const { data: student } = await GetStudentById(id);
      if (student) {
        this.setState({
          student,
          gender: student.gender.name,
          roomNo: student.sit.name,
          loader: false
        });
      }
    } catch (error) {
      this.setState({ loader: false });
    }
  }

  handelDelete = id => {
    bootbox.confirm("Are you sure?", async res => {
      this.setState({ loader: true });
      if (res) {
        try {
          const { data } = await DeleteStudent(id);
          if (data) {
            this.setState({ loader: false });
            this.props.history.push("/admin/student");
          }
        } catch (error) {
          this.setState({ loader: true });
        }
      }
      this.setState({ loader: true });
    });
  };

  render() {
    let { student, loader, gender, roomNo } = this.state;

    return (
      <div className="white-section">
        <div className="enter-padding">
          <Spiner loader={loader} />

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
                  <h1>Gender:</h1> <span>{gender}</span>
                </li>
                <li className="text-info">
                  <h1>Paid Amount:</h1> <span>{student.paidAmount}</span>
                </li>
                <li className="text-info">
                  <h1>Deu Amount</h1> <span>{student.deuAmount}</span>
                </li>
                <li className="text-info">
                  <h1>Room Number:</h1> <span>{roomNo}</span>
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
              <div
                className="update-btn mr-3"
                onClick={() =>
                  this.props.history.push("/admin/studentform/" + student.id)
                }
              >
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
              </div>
              <div
                className="delete-btn ml-3"
                onClick={() => this.handelDelete(student.id)}
              >
                <i class="fa fa-trash-o" aria-hidden="true"></i>
              </div>
              <div
                onClick={() =>
                  this.props.history.push("/admin/pay/" + student.id)
                }
                className="btn btn-primary ml-5 pay animated shake"
              >
                Pay
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StudentDetails;
