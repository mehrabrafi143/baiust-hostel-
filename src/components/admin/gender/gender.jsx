import React, { Component } from "react";
class Gender extends Component {
  async componentDidMount() {}

  render() {
    return (
      <div className="form-group mt-5">
        <div className="form-check form-check-inline">
          <input
            className="form-check-input position-static"
            type="radio"
            name="gender"
            id="gender"
            value="1"
            onChange={this.props.hadelGenderChange}
          />
          <label className="form-check-label" for="inlineCheckbox1">
            Male
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input position-static"
            type="radio"
            name="gender"
            id="gender"
            value="2"
            onChange={this.props.hadelGenderChange}
          />
          <label className="form-check-label" for="inlineCheckbox2">
            Female
          </label>
        </div>
      </div>
    );
  }
}

export default Gender;
