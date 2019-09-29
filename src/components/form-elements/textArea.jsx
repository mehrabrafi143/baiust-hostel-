import React from "react";

const TextArea = ({ name, value, label, error, onChange }) => {
  return (
    <div className="form-group">
      <textarea
        onChange={onChange}
        name={name}
        cols="30"
        rows="10"
        className="form-control"
        placeholder={label}
        value={value}
      ></textarea>
      <small className="form-text text-danger">{error ? error : null}</small>
    </div>
  );
};

export default TextArea;
