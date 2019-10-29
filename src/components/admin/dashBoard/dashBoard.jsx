import React, { Component } from "react";
import { AvailableSite } from "./../../../service/sitServices/sitServices";
import { Link } from "react-router-dom";
import { MealCount } from "../../../service/mealServices/mealServices";

class DashBoard extends Component {
  state = {
    sits: [],
    mealsCount: []
  };

  async componentDidMount() {
    try {
      const { data: sits } = await AvailableSite();
      const { data: mealsCount } = await MealCount();
      this.setState({ sits, mealsCount });
    } catch (error) {}
  }

  render() {
    const { sits, mealsCount } = this.state;

    return (
      <React.Fragment>
        <div className=" tranparent enter-padding-lg">
          <div className=" row">
            <div className="section-top-title">
              {" "}
              <i className="fa fa-home"></i> Dashboard
            </div>
            <div className="col-4">
              <div className="generic-card">
                <div className="generic-card__title">Male Seat Capacity </div>
                <div className="generic-card__body">
                  {sits[0]}
                  <p>Male Seats</p>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="generic-card">
                <div className="generic-card__title">Available Male Seats</div>
                <div className="generic-card__body">
                  {sits[1]}
                  <p>Seats in total</p>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="generic-card">
                <div className="generic-card__title">Female Seat Capacity</div>
                <div className="generic-card__body">
                  {sits[2]}
                  <p>Female Seats</p>
                </div>
              </div>
            </div>
          </div>

          <div className="tranparent row  mt-5">
            <div className="col-4">
              <div className="generic-card">
                <div className="generic-card__title">
                  Available Female Seats
                </div>
                <div className="generic-card__body">
                  {sits[3]}
                  <p>Seats in total</p>
                </div>
              </div>
            </div>
          </div>
          <div className="tranparent row  margin-top-lg">
            <div className="col-4">
              <div className="generic-card">
                <div className="generic-card__title">
                  today's Total breakfast
                </div>
                <div className="generic-card__body">
                  {mealsCount[0]}
                  <p> In total</p>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="generic-card">
                <div className="generic-card__title">today's Total lunch</div>
                <div className="generic-card__body">
                  {mealsCount[1]}
                  <p>In total</p>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="generic-card">
                <div className="generic-card__title">today's Total dinner</div>
                <div className="generic-card__body">
                  {mealsCount[2]}
                  <p>In total</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DashBoard;
