import React, { Component } from "react";
import { GetSits } from "./../../../../service/sitServices/sitServices";

class MaleRoom extends Component {
  state = {
    value: "",
    suggestions: [],
    languages: []
  };

  async componentWillMount() {
    const { data: languages } = await GetSits(1);
    this.setState({ languages });
  }

  render() {
    const { value, error, renderInput } = this.props;
    return (
      <React.Fragment>
        <p className="text-md mt-5 lSp-md text-info">
          Room selecting for{" "}
          <span className="badge badge-danger badge-lg mr-3"> Boys </span> at
          The tenth floor building
        </p>
        {renderInput("roomNo", value, " Room Number", error)}
      </React.Fragment>
    );
  }
}

export default MaleRoom;
