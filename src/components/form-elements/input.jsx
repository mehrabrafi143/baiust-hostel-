import React from "react";

const Input = ({ name, value, type = "text", label, error, onChange }) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className="form-input"
        id={name}
        name={name}
        placeholder={label}
        value={value}
        onChange={onChange}
      />
      <small id="emailHelp" className="form-text text-danger">
        {error ? error : null}
      </small>
    </div>
  );
};

export default Input;
