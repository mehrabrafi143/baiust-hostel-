import React, { Component } from "react";

class FemaleRoom extends Component {
  state = {};
  render() {
    const { value, error, renderInput } = this.props;
    return (
      <React.Fragment>
        <p className="text-md mt-5 text-info lSp-md">
          Room selecting for{" "}
          <span className="badge badge-danger mr-3"> Girls </span>
          at The Eighth floor building
        </p>
        {renderInput("roomNo", value, " Room Number", error)}
      </React.Fragment>
    );
  }
}

export default FemaleRoom;
