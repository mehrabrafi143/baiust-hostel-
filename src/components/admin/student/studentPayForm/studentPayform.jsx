import React from "react";
import Form from "./../../../form/form";
import Joi from "joi-browser";
import { StudentsPay } from "./../../../../service/studentsPayService/studentsPay";
import Spiner from "./../../../spiner/spiner";

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
      <div className="white-section">
        <div className="enter-padding">
          <Spiner loader={loader} />
          <h2 className="section-title"> Paying Form </h2>
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
    );
  }
}

export default StudentPayForm;
