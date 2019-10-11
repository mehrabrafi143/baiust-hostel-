import React, { Component } from "react";
import { AvailableSite } from "./../../../service/sitServices/sitServices";
import { Link } from "react-router-dom";

class DashBoard extends Component {
  state = {
    sits: []
  };

  async componentDidMount() {
    try {
      const { data: sits } = await AvailableSite();
      this.setState({ sits });
    } catch (error) {}
  }

  render() {
    const { sits } = this.state;
    return (
      <div className="white-section">
        <div className="enter-padding">
          <div className="text-right mb-5">
            <Link to="/admin/notice" className="noticeBtn">
              Create Notice
            </Link>
          </div>
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
        </div>
      </div>
    );
  }
}

export default DashBoard;
