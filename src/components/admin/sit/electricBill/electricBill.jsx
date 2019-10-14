import React from "react";
import Form from "./../../../form/form";
import Joi from "joi-browser";
import Loader from "react-loader-spinner";
import { ElectricBillPay } from "../../../../service/sitServices/sitServices";
import Spiner from "../../../spiner/spiner";

class ElectricBill extends Form {
  state = {
    data: {
      roomId: "",
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
        roomId: this.props.match.params.id,
        amount: this.state.data.amount
      };
      const { data: res } = await ElectricBillPay(data);
      if (res) {
        this.setState({ loader: false });

        this.props.history.push("/admin/sits");
      }
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
          <h2 className="section-title"> Electricity Bill </h2>
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

export default ElectricBill;
