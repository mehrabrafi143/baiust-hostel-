import React, { Component } from "react";
import Spiner from "../../spiner/spiner";
import {
  GetMeals,
  AddMeal,
  TakenMeal,
  RemoveMeal
} from "../../../service/mealServices/mealServices";
import bootbox from "bootbox";
import { getUserName } from "../../../service/authService/authService";
import { GetStudent } from "../../../service/studentServices/studentServices";
import $ from "jquery";

import MenuCardUser from "../MenuCardUser/menuCardUser";

class UserMenuCards extends Component {
  state = {
    data: [],
    loader: true,
    studentMeal: [],
    taken: [],
    studentId: 0
  };

  async componentDidMount() {
    try {
      const username = getUserName();
      const { data: student } = await GetStudent(username);
      const { data } = await GetMeals();
      const { data: studentMeal } = await TakenMeal(student.id);
      let taken = [];
      studentMeal.map(sm => taken.push(sm.mealId));

      this.setState({
        data,
        loader: false,
        studentMeal,
        taken,
        studentId: student.id
      });
    } catch (er) {
      this.setState({ loader: false });
    }
  }

  handelTakeMeal = async mealId => {
    const { taken, studentId } = this.state;
    const oldTaken = taken;
    bootbox
      .confirm("Take it?", async res => {
        if (res) {
          this.setState({ loader: true });
          const { data: studentMeal } = await TakenMeal(studentId);
          taken.push(mealId);

          const data = { studentId, mealId };
          const { data: res } = await AddMeal(data);
          if (studentMeal && res) {
            this.setState({ loader: false, taken, studentMeal });
          }
        }
      })
      .find(".modal-content")
      .css({
        "margin-top": function() {
          var w = $(window).height();
          var b = $(".modal-dialog").height();
          // should not be (w-h)/2
          var h = (w - b) / 5;
          return h + "px";
        }
      });
  };

  handelRemoveMeal = async mealId => {
    const { taken, studentId } = this.state;
    const oldTaken = taken;

    try {
      bootbox
        .confirm("Cancle it?", async res => {
          if (res) {
            this.setState({ loader: true });
            const index = taken.indexOf(mealId);
            taken.splice(index, 1);
            const { data: studentMeal } = await TakenMeal(studentId);
            const data = { studentId, mealId };
            const { data: res } = await RemoveMeal(data);
            if ((studentMeal, res)) {
              this.setState({ taken, studentMeal, loader: false });
            }
          }
        })
        .find(".modal-content")
        .css({
          "margin-top": function() {
            var w = $(window).height();
            var b = $(".modal-dialog").height();
            // should not be (w-h)/2
            var h = (w - b) / 5;
            return h + "px";
          }
        });
    } catch (error) {
      this.setState({ taken: oldTaken, loader: false });
    }
  };

  render() {
    const { data, loader, taken, studentMeal } = this.state;

    return (
      <div className="user-section">
        <div className="container">
          <Spiner loader={loader} />
          <h1 className="text-center pt-5 user-section_title">
            Meals assigns for today
          </h1>

          <div className="flex pt-5">
            {data.map(meal =>
              meal.foodMenu ? (
                <MenuCardUser
                  key={meal.id}
                  handelTakeMeal={this.handelTakeMeal}
                  menu={meal.foodMenu}
                  name={meal.name}
                  mealId={meal.id}
                  taken={taken}
                  studentMeal={studentMeal}
                  handelRemoveMeal={this.handelRemoveMeal}
                />
              ) : null
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default UserMenuCards;
