import React, { Component } from "react";
import { Link } from "react-router-dom";

class MenuCard extends Component {
  state = {
    classes: "card__model hide"
  };

  manageOption = () => {
    const classes =
      this.state.classes === "card__model hide"
        ? "card__model"
        : "card__model hide";
    this.setState({ classes });
  };

  componentDidMount() {
    document.body.addEventListener("click", () => {
      this.setState({ classes: "card__model hide" });
    });
  }

  render() {
    const { menu, handelDelete } = this.props;
    return (
      <div className="card card-md">
        <div className="card-header">
          <div className="right-icon">
            <div className="card-icon" onClick={() => this.manageOption()}>
              <i className="fa fa-ellipsis-v fa-lg" aria-hidden="true" />
            </div>
            <div className={this.state.classes}>
              <Link to={"/admin/addmenu/" + menu.id}>Edit</Link>
              <Link onClick={() => handelDelete(menu.id)}>Delete</Link>
              <Link>Assign</Link>
            </div>
          </div>
          <div className="card-header__title">
            <Link to={"admin/"}>{menu.name}</Link>
            <span className="card-title__price">{menu.fullPrice}</span>
          </div>
        </div>
        <ul className="list-group list-group-flush card-list">
          {menu.foodItems.map(f => (
            <li className="list-group-item">
              {f.name} |{" "}
              <bold className="text-bold">Price: {f.pricePerHead}</bold>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default MenuCard;
