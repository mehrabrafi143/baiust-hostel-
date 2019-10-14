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
          <h1 className="section-title">In Total Information</h1>
          <ul className="dashboard-section">
            <li>
              <div className="section-title">Total Due Amount</div>
              <p>{totalDeu}</p>
            </li>
            <li>
              <div className="section-title">Total Paid Amout</div>
              <p>{totalPaid}</p>
            </li>
          </ul>
          <h1 className="section-title margin-top-lg">
            Today's Meal Overall Price
          </h1>
          <ul className="dashboard-section">
            <li>
              <div className="section-title">Today's Total Meal Price</div>
              <p>{totalMealPrice[0]}</p>
            </li>
            <li>
              <div className="section-title">
                Today's Total Extra Meal PRice
              </div>
              <p>{totalMealPrice[1]}</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Account;
