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
      <div className="section-card">
        <div className="container">
          <div className="row account">
            <div className="col-4">
              <div className="blue-gradient animated bounceInLeft account-card">
                <h1 className="card-header-title">
                  Todays Students Total Meal Price
                </h1>
                <span className="amount"> {totalMealPrice[0]} </span>
              </div>
            </div>
            <div className="col-4 ">
              <div className="peach-gradient account-card animated bounceInDown">
                <h1 className="card-header-title"> Total Due Amount </h1>
                <span className="amount"> {totalDeu} </span>
              </div>
            </div>
            <div className="col-4">
              <div className="purple-gradient account-card animated bounceInRight">
                <h1 className="card-header-title"> Total Paid </h1>
                <span className="amount">{totalPaid}</span>
              </div>
            </div>
          </div>
          <div className="row account mt-5">
            <div className="col-4">
              <div className="blue-gradient animated bounceInLeft account-card">
                <h1 className="card-header-title">
                  Todays Total Extra Meal Price
                </h1>
                <span className="amount"> {totalMealPrice[1]} </span>
              </div>
            </div>
            <div className="col-4"></div>
            <div className="col-4">
              <div className="purple-gradient account-card animated bounceInRight">
                <h1 className="card-header-title">Todays Total Meal Price</h1>
                <span className="amount">
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
