import React, { Component } from "react";
import Spiner from "./../../spiner/spiner";

import {
  GetTotalMealPrice,
  GetDeu,
  GetPaid
} from "./../../../service/accountInfo/accountInfo";

class Account extends Component {
  state = {
    totalMealPrice: [],
    totalDeu: 0,
    totalPaid: 0,
    loader: false
  };

  async componentDidMount() {
    try {
      this.setState({ loader: true });
      const { data: totalMealPrice } = await GetTotalMealPrice();
      const { data: totalDeu } = await GetDeu();
      const { data: totalPaid } = await GetPaid();
      if (totalMealPrice)
        this.setState({ totalMealPrice, totalDeu, totalPaid, loader: false });
    } catch (e) {
      this.setState({ loader: false });
    }
  }

  render() {
    const { totalMealPrice, loader, totalDeu, totalPaid } = this.state;

    return (
      <div className="white-section">
        <div className="enter-padding">
          <div className="row">
            <div className="col-4">
              <div className="bg-gray account-info">
                <h1 className="account-info_title">
                  Todays Students Total Meal Price
                </h1>
                <span className="account-info_amount">
                  {" "}
                  {totalMealPrice[0]}{" "}
                </span>
              </div>
            </div>
            <div className="col-4 ">
              <div className="bg-gray account-info">
                <h1 className="account-info_title"> Total Due Amount </h1>
                <span className="account-info_amount"> {totalDeu} </span>
              </div>
            </div>
            <div className="col-4">
              <div className="bg-gray account-info">
                <h1 className="account-info_title"> Total Paid </h1>
                <span className="account-info_amount">{totalPaid}</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="bg-gray account-info">
                <h1 className="account-info_title">
                  Todays Total Extra Meal Price
                </h1>
                <span className="account-info_amount">
                  {" "}
                  {totalMealPrice[1]}{" "}
                </span>
              </div>
            </div>
            <div className="col-4">
              <div className="bg-gray account-info">
                <h1 className="account-info_title">Todays Total Meal Price</h1>
                <span className="account-info_amount">
                  {totalMealPrice[1] + totalMealPrice[0]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Account;
