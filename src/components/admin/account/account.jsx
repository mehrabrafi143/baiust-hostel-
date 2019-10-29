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
      <React.Fragment>
        <Spiner loader={loader} />
        <div className=" tranparent enter-padding-lg">
          <div className=" row">
            <div className="section-top-title">
              {" "}
              <i className="fa fa-money"></i> Account
            </div>
            <div className="col-6">
              <div className="generic-card generic-card--lg">
                <div className="generic-card__title">Total Due Amount </div>
                <div className="generic-card__body">
                  {totalDeu}
                  <p>Taka Only</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="generic-card generic-card--lg">
                <div className="generic-card__title">Total Paid Amout</div>
                <div className="generic-card__body">
                  {totalPaid}
                  <p>Seats in total</p>
                </div>
              </div>
            </div>
          </div>

          <div className="tranparent row  mt-5">
            <div className="col-6">
              <div className="generic-card generic-card--lg">
                <div className="generic-card__title">
                  Today's Meal Overall Price
                </div>
                <div className="generic-card__body">
                  {totalMealPrice[0]}
                  <p>Seats in total</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="generic-card generic-card--lg">
                <div className="generic-card__title">
                  Today's Total Extra Meal Price
                </div>
                <div className="generic-card__body">
                  {totalMealPrice[1]}
                  <p> In total</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Account;
