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
      <div className="white-section">
        <div className="enter-padding">
          <div className="">
            <Link to="/admin/notice" className="noticeBtn">
              Post A Notice
            </Link>
          </div>

          <div className="section-title mt-5">Sit's Count </div>

          <ul className="dashboard-section">
            <li>
              <div className="section-title">Male Sit Capasity</div>
              <p>{sits[0]}</p>
            </li>
            <li>
              <div className="section-title">Available Male Sits</div>
              <p>{sits[1]}</p>
            </li>
          </ul>
          <ul className="dashboard-section">
            <li>
              <div className="section-title">Female Sit Capasity</div>
              <p>{sits[2]}</p>
            </li>
            <li>
              <div className="section-title">Available Female Sits</div>
              <p>{sits[3]}</p>
            </li>
          </ul>

          <div className="section-title margin-top-lg">
            Today's Taken Meal's Count{" "}
          </div>
          <ul className="dashboard-section">
            <li>
              <div className="section-title">today's Total breakfast</div>
              <p>{mealsCount[0]}</p>
            </li>
            <li>
              <div className="section-title">today's Total launch</div>
              <p>{mealsCount[1]}</p>
            </li>
          </ul>
          <ul className="dashboard-section">
            <li>
              <div className="section-title">today's Total dinner</div>
              <p>{mealsCount[2]}</p>
            </li>
            <li></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default DashBoard;
