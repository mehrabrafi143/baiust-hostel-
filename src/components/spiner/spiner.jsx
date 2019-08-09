import React from "react";
import Loader from "react-loader-spinner";

const Spiner = ({ loader }) => {
  return loader ? (
    <div className="full-body">
      <div className="center">
        <Loader type="Oval" color="#1B3A5E" height={60} width={60} />
      </div>
    </div>
  ) : null;
};

export default Spiner;
