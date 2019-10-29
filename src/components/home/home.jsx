import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import Hero from "../user/hero/hero";
import Goal from "../../slidePics/goal.jpg";
import Img from "../../slidePics/pic1.jpg";
import SaminRahman from "../../slidePics/md-samin-rahman.jpg";
import HallMan1 from "../../slidePics/hall-man-1.jpg";
import HallMan2 from "../../slidePics/hall-man-2.jpg";
import HallMan3 from "../../slidePics/hall-man-3.jpg";
import Facility from "../../slidePics/facility.jpg";

import {
  getUserRole,
  getUserName
} from "./../../service/authService/authService";

class Home extends Component {
  state = {};

  handelChangePage = () => {
    const user = getUserName(),
      role = getUserRole();
    if (!user) return this.props.history.push("/home");
    let location = "";
    location = user && role === "Admin" ? "/admin" : "/user";
    this.props.history.push(location);
  };

  componentDidMount() {
    this.handelChangePage();
  }

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg usernavbar">
          <Link to="" className="navbar-brand margin-left">
            BAIUST HOSTEL
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa fa-bars" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav right-align">
              <li className="nav-item ">
                <a className="nav-link" href="#ourGoal">
                  Our Goal
                </a>
              </li>
              <li className="nav-item ">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item ">
                <a className="nav-link" href="#AUTHORITY">
                  AUTHORITY
                </a>
              </li>
              <li className="nav-item ">
                <a className="nav-link" href="#FACILITY">
                  FACILITY
                </a>
              </li>
              <li className="nav-item ">
                <NavLink className="nav-link" to="/login">
                  Log in
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        <Hero />
        <div className="our-section our-section-fix full-width" id="ourGoal">
          <div className="">
            <h2 className="section-title section-title-bg">Our Goal</h2>
          </div>
          <div className="row">
            <div className="col-6">
              <img src={Goal} alt="" />
            </div>
            <div className="col-6">
              <p>
                IT IS A LONG ESTABLISHED FACT THAT A READER WILL BE DISTRACTED
                BY THE READABLE CONTENT OF A PAGE WHEN LOOKING AT ITS LAYOUT.
                THE POINT OF USING LOREM IPSUM IS THAT IT HAS A MORE-OR-LESS
                NORMAL DISTRIBUTION OF LETTERS, AS OPPOSED TO USING 'CONTENT
                HERE, CONTENT HERE', MAKING IT LOOK LIKE READABLE ENGLISH
              </p>
              <p>
                IT IS A LONG ESTABLISHED FACT THAT A READER WILL BE DISTRACTED
                BY THE READABLE CONTENT OF A PAGE WHEN LOOKING AT ITS LAYOUT.
                THE POINT OF USING LOREM IPSUM IS THAT IT HAS A MORE-OR-LESS
                NORMAL DISTRIBUTION OF LETTERS, AS OPPOSED TO USING 'CONTENT
                HERE, CONTENT HERE', MAKING IT LOOK LIKE READABLE ENGLISH
              </p>
            </div>
          </div>
        </div>
        <div className="container home-section" id="about">
          <div className="">
            <h2 className="section-title section-title-bg">About</h2>
          </div>
          <div className="row">
            <div className="col-6">
              <p>
                IT IS A LONG ESTABLISHED FACT THAT A READER WILL BE DISTRACTED
                BY THE READABLE CONTENT OF A PAGE WHEN LOOKING AT ITS LAYOUT.
                THE POINT OF USING LOREM IPSUM IS THAT IT HAS A MORE-OR-LESS
                NORMAL DISTRIBUTION OF LETTERS, AS OPPOSED TO USING 'CONTENT
                HERE, CONTENT HERE', MAKING IT LOOK LIKE READABLE ENGLISH
              </p>
              <p>
                IT IS A LONG ESTABLISHED FACT THAT A READER WILL BE DISTRACTED
                BY THE READABLE CONTENT OF A PAGE WHEN LOOKING AT ITS LAYOUT.
                THE POINT OF USING LOREM IPSUM IS THAT IT HAS A MORE-OR-LESS
                NORMAL DISTRIBUTION OF LETTERS, AS OPPOSED TO USING 'CONTENT
                HERE, CONTENT HERE', MAKING IT LOOK LIKE READABLE ENGLISH
              </p>
            </div>
            <div className="col-6">
              <img src={Img} alt="" />
            </div>
          </div>
        </div>

        <div className="our-section full-width" id="AUTHORITY">
          <div className="">
            <h2 className="section-title section-title-bg">hall authority</h2>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <div className="member-card">
                  <img src={SaminRahman} alt="" />
                  <div class="member-card-text">
                    <h4>
                      <b>Samin Rahman</b>
                    </h4>
                    <p>hall provost</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row margin-top-lg">
            <div className="col-4">
              <div className="member-card">
                <img src={HallMan1} alt="" />
                <div class="member-card-text">
                  <h4>
                    <b>Ibrahim Karib</b>
                  </h4>
                  <p>hall accountant</p>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="member-card">
                <img src={HallMan2} alt="" />
                <div class="member-card-text">
                  <h4>
                    <b>Humayan Karib</b>
                  </h4>
                  <p>hall supervisor</p>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="member-card">
                <img src={HallMan3} alt="" />
                <div class="member-card-text">
                  <h4>
                    <b>Jamal Khan</b>
                  </h4>
                  <p>hall manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container home-section" id="FACILITY">
          <div className="">
            <h2 className="section-title section-title-bg">Facility</h2>
          </div>
          <div className="row">
            <div className="col-6">
              <p>
                IT IS A LONG ESTABLISHED FACT THAT A READER WILL BE DISTRACTED
                BY THE READABLE CONTENT OF A PAGE WHEN LOOKING AT ITS LAYOUT.
                THE POINT OF USING LOREM IPSUM IS THAT IT HAS A MORE-OR-LESS
                NORMAL DISTRIBUTION OF LETTERS, AS OPPOSED TO USING 'CONTENT
                HERE, CONTENT HERE', MAKING IT LOOK LIKE READABLE ENGLISH
              </p>
              <p>
                IT IS A LONG ESTABLISHED FACT THAT A READER WILL BE DISTRACTED
                BY THE READABLE CONTENT OF A PAGE WHEN LOOKING AT ITS LAYOUT.
                THE POINT OF USING LOREM IPSUM IS THAT IT HAS A MORE-OR-LESS
                NORMAL DISTRIBUTION OF LETTERS, AS OPPOSED TO USING 'CONTENT
                HERE, CONTENT HERE', MAKING IT LOOK LIKE READABLE ENGLISH
              </p>
            </div>
            <div className="col-6">
              <img src={Facility} alt="" />
            </div>
          </div>
        </div>

        <div className="full-width contract-section">
          <div className="">
            <h2 className="section-title section-title-bg ">Contract Us</h2>
            <p>
              email: <span>maharabrafi@gmail.com</span>
            </p>
            <p>
              phone: <span>01309696976</span>
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
