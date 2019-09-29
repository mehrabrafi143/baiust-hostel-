import React from "react";
import Form from "./../../../form/form";
import Joi from "joi-browser";
import {
  AddStudent,
  GetStudentById
} from "./../../../../service/studentServices/studentServices";
import Loader from "react-loader-spinner";

class StudentForm extends Form {
  state = {
    data: {
      name: "",
      roll: "",
      dept: "",
      roomNo: "",
      phoneNumber: "",
      address: ""
    },

    errors: {
      name: "",
      roll: "",
      dept: "",
      roomNo: "",
      phoneNumber: "",
      address: ""
    },
    loader: false,
    genericErrors: ""
  };

  schema = {
    name: Joi.string()
      .required()
      .max(30)
      .min(5),
    roll: Joi.number()
      .min(7)
      .required(),
    dept: Joi.string()
      .required()
      .min(2)
      .max(5),
    roomNo: Joi.string().required(),
    phoneNumber: Joi.number().required(),
    address: Joi.string().required()
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    if (id) {
      this.setState({ loader: true });
      try {
        const { data } = await GetStudentById(id);
        if (data) {
          this.setState({
            data,
            loader: false
          });
        }
      } catch (error) {
        this.setState({ loader: false });
      }
    }
  }

  dosubmit = async () => {
    this.setState({ loader: true });

    try {
      const { data } = this.state;
      data.userAccountId = this.props.match.params.id;
      await AddStudent(data);
      this.props.history.push("/admin/student");
    } catch (error) {
      this.setState({
        loader: false,
        genericErrors: error.response.data.message
      });
    }
  };

  render() {
    const { data, errors, loader } = this.state;
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-6">
            {loader ? (
              <div className="full-body">
                <div className="center">
                  <Loader type="Oval" color="#1B3A5E" height={60} width={60} />
                </div>
              </div>
            ) : null}
            <h2> Information Form </h2>
            <p className="form-text text-danger">{this.state.genericErrors}</p>
            <form className="form" onSubmit={this.handelSubmit}>
              {this.renderInput(
                "name",
                data.name,
                "Enter Full Name",
                errors.name
              )}
              {this.renderInput("roll", data.roll, "Enter Id", errors.roll)}

              {this.renderInput(
                "roomNo",
                data.roomNo,
                "Room Number",
                errors.roomNo
              )}

              {this.renderInput("dept", data.dept, "Department", errors.dept)}
              {this.renderInput(
                "phoneNumber",
                data.phoneNumber,
                "Phone Number",
                errors.phoneNumber
              )}
              {this.renderInput(
                "address",
                data.address,
                "Address",
                errors.address
              )}
              {this.renderButton("Save")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default StudentForm;
