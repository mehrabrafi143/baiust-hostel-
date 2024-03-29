import React from "react";
import Joi from "joi-browser";
import Form from "./../../form/form";
import Spiner from "../../spiner/spiner";
import { AddMonthlyBill } from "./../../../service/monthlyBillService/monthlyBillService";

class MonthlyBill extends Form {
  state = {
    data: {
      roomBill: "",
      servicePrice: ""
    },
    errors: {
      roomBill: "",
      servicePrice: ""
    },
    loader: false
  };

  schema = {
    roomBill: Joi.number()
      .required()
      .min(100)
      .max(5000)
      .label("roomBill"),
    servicePrice: Joi.number()
      .required()
      .min(100)
      .max(2000)
      .label("servicePrice")
  };

  dosubmit = async () => {
    this.setState({ loader: true });
    try {
      const { data } = this.state;
      const { data: res } = await AddMonthlyBill(data);
      this.props.history.push("/admin/dashboard/");
    } catch (error) {
      this.ShowServerErrors(error);
      this.setState({ loader: false });
    }
  };

  render() {
    const { data, errors, loader } = this.state;

    return (
      <div className="white-section">
        <div className="enter-padding">
          <Spiner loader={loader} />

          <h2 className="section-title"> Monthly Bill </h2>
          <p className="form-text text-danger">{this.state.genericErrors}</p>
          <form className="form" onSubmit={this.handelSubmit}>
            {this.renderInput(
              "roomBill",
              data.roomBill,
              "Enter Room Bill",
              errors.roomBill,
              "roomBill"
            )}
            {this.renderInput(
              "servicePrice",
              data.servicePrice,
              "Enter Service Price",
              errors.servicePrice,
              "servicePrice"
            )}
            {this.renderButton("Save")}
          </form>
        </div>
      </div>
    );
  }
}

export default MonthlyBill;
