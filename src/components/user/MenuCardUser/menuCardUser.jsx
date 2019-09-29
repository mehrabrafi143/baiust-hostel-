import React, { Component } from "react";
import { Link } from "react-router-dom";

class UserMenuCard extends Component {
  render() {
    const {
      menu,
      name,
      handelTakeMeal,
      mealId,
      taken,
      handelRemoveMeal
    } = this.props;

    let count = 1;
    let token;

    this.props.studentMeal.map(sm =>
      sm.mealId === this.props.mealId ? (token = sm.mealToken) : null
    );

    return (
      <div className="card card-md ">
        <div className="card-header">
          <div className="card-header__title">
            <Link to={"/user/meal/" + menu.id}>{menu.name}</Link>
            <span className="card-title__price">{menu.fullPrice}</span>
          </div>
        </div>
        <ul className="list-group list-group-flush card-list">
          {menu.foodItems.map(f =>
            count++ <= 3 ? (
              <li className="list-group-item" key={f.id}>
                {f.name} |{" "}
                <span className="text-bold">Price: {f.pricePerHead}</span>
              </li>
            ) : null
          )}
        </ul>
        {
          <div className="card-body">
            <div className="text-info">
              {name ? (
                <span>
                  <strong>{name}</strong>
                </span>
              ) : null}

              {!taken.includes(mealId) ? (
                <Link className="ml-4" onClick={() => handelTakeMeal(mealId)}>
                  Take It
                </Link>
              ) : (
                <React.Fragment>
                  <Link
                    className="ml-4"
                    onClick={() => handelRemoveMeal(mealId)}
                  >
                    Cancel It
                  </Link>
                  <span className="ml-4 text-medium badge badge-danger text-bold">
                    {token}
                  </span>
                </React.Fragment>
              )}
            </div>
          </div>
        }
      </div>
    );
  }
}

export default UserMenuCard;
