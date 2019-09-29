import React, { Component } from "react";
import { GetMeals } from "./../../../service/mealServices/mealServices";
import MenuCard from "./../foodmenu/menuCard/menuCard";
class DashBoard extends Component {
  state = {
    meals: []
  };

  async componentDidMount() {
    try {
      const { data: meals } = await GetMeals();
      this.setState({ meals });
    } catch (error) {}
  }

  render() {
    return (
      <div className="section-card">
        {/* {this.state.meals.map(meal.foodMenu => (
          <MenuCard menu={meal} />
        ))} */}
      </div>
    );
  }
}

export default DashBoard;
