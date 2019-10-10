import React, { Component } from "react";

export class StudentSit extends Component {
  render() {
    const {
      onChangeAuto,
      onClickAuto,
      onKeyDownAuto,
      activeSuggestion,
      filteredSuggestions,
      showSuggestions,
      value,
      suggestions,
      sex,
      building
    } = this.props;

    let suggestionsListComponent;

    if (showSuggestions && value) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              if (index === activeSuggestion) {
                className = "";
              }

              return (
                <li key={suggestion} onClick={onClickAuto}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No suggestions</em>
          </div>
        );
      }
    }

    return (
      <React.Fragment>
        <p className="text-md mt-5 lSp-md text-info">
          Room selecting for{" "}
          <span className="badge badge-danger badge-lg mr-3"> {sex} </span> at
          the
          {building}
        </p>
        <div className="form-group">
          <input
            type="search"
            className="form-input"
            placeholder="Room number"
            value={value}
            onChange={onChangeAuto}
            onKeyDown={onKeyDownAuto}
            disabled={!suggestions.length}
          />
          <small id="emailHelp" className="form-text text-danger">
            {value ? null : "required feild"}
          </small>
        </div>
        {suggestionsListComponent}
      </React.Fragment>
    );
  }
}

export default StudentSit;
