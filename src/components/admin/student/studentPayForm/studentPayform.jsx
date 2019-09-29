import React from "react";
import Form from "./../../../form/form";
import Joi from "joi-browser";
import Loader from "react-loader-spinner";
import { StudentsPay } from "./../../../../service/studentsPayService/studentsPay";

class StudentPayForm extends Form {
  state = {
    data: {
      amount: ""
    },

    errors: {
      amount: ""
    },
    loader: false
  };

  schema = {
    amount: Joi.number().required()
  };

  dosubmit = async () => {
    this.setState({ loader: true });

    try {
      const data = {
        studentId: this.props.match.params.id,
        amount: this.state.data.amount
      };
      const { data: res } = await StudentsPay(data);
      if (res) this.props.history.push("/admin/student");
    } catch (error) {
      this.setState({
        loader: false
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
            <h2> Paying Form </h2>
            <p className="form-text text-danger">{this.state.genericErrors}</p>
            <form className="form" onSubmit={this.handelSubmit}>
              {this.renderInput(
                "amount",
                data.amount,
                "Enter Amount",
                errors.amount
              )}
              {this.renderButton("Save")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default StudentPayForm;
