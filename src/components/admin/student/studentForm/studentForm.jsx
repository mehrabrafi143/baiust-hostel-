import React from "react";
import Form from "./../../../form/form";
import Joi from "joi-browser";
import {
  AddStudent,
  GetStudentById
} from "./../../../../service/studentServices/studentServices";
import Loader from "react-loader-spinner";
import Gender from "./../../gender/gender";
import FemaleRoom from "./femaleRoom";
import { GetSits } from "./../../../../service/sitServices/sitServices";
import Autocomplete from "./try";

class StudentForm extends Form {
  state = {
    data: {
      name: "",
      roll: "",
      dept: "",
      roomNo: "",
      phoneNumber: "",
      address: ""
    },
    suggestions: [],
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    gender: "",
    errors: {
      name: "",
      roll: "",
      dept: "",
      roomNo: "",
      phoneNumber: "",
      address: ""
    },
    loader: false,
    genericErrors: "",
    sex: "",
    building: ""
  };
  //start autosuggation

  onChangeAuto = e => {
    const { suggestions } = this.state;
    const value = e.currentTarget.value;
    console.log(value);
    const filteredSuggestions = suggestions.filter(
      suggestion => suggestion.toLowerCase().indexOf(value.toLowerCase()) > -1
    );

    const data = { ...this.state.data, roomNo: e.currentTarget.value };

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      data
    });
  };

  onClickAuto = e => {
    const data = { ...this.state.data, roomNo: e.currentTarget.innerText };
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      data
    });
  };

  onKeyDownAuto = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      const data = {
        ...this.state.data,
        roomNo: filteredSuggestions[activeSuggestion]
      };
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        data
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  //end autosuggation
  hadelGenderChange = async ({ currentTarget }) => {
    this.setState({ gender: currentTarget["value"] });

    if (currentTarget["value"] === "1") {
      this.setState({ sex: " Boys ", building: " tenth floor building " });
    } else {
      this.setState({ sex: " Girls ", building: " Eighth floor building " });
    }

    const { data: suggestions } = await GetSits(currentTarget["value"]);
    this.setState({ suggestions });
  };

  schema = {
    name: Joi.string()
      .required()
      .max(30)
      .min(5),
    roll: Joi.number()
      .min(7)
      .required(),
    dept: Joi.string()
      .required()
      .min(2)
      .max(5),
    roomNo: Joi.string().required(),
    phoneNumber: Joi.number().required(),
    address: Joi.string().required()
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    if (id) {
      this.setState({ loader: true });
      try {
        const { data } = await GetStudentById(id);
        if (data) {
          this.setState({
            data,
            loader: false
          });
        }
      } catch (error) {
        this.setState({ loader: false });
      }
    }
  }

  dosubmit = async () => {
    this.setState({ loader: true });

    try {
      const { data } = this.state;
      data.userAccountId = this.props.match.params.id;
      await AddStudent(data);
      this.props.history.push("/admin/student");
    } catch (error) {
      this.setState({
        loader: false,
        genericErrors: error.response.data.message
      });
    }
  };

  render() {
    const {
      data,
      errors,
      loader,
      gender,
      activeSuggestion,
      filteredSuggestions,
      showSuggestions,
      suggestions,
      sex,
      building
    } = this.state;
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-7">
            {loader ? (
              <div className="full-body">
                <div className="center">
                  <Loader type="Oval" color="#1B3A5E" height={60} width={60} />
                </div>
              </div>
            ) : null}
            <h2> Information Form </h2>
            <p className="form-text text-danger">{this.state.genericErrors}</p>
            <form className="form" onSubmit={this.handelSubmit}>
              {this.renderInput(
                "name",
                data.name,
                "Enter Full Name",
                errors.name
              )}
              {this.renderInput("roll", data.roll, "Enter Id", errors.roll)}
              {this.renderInput("dept", data.dept, "Department", errors.dept)}
              {this.renderInput(
                "phoneNumber",
                data.phoneNumber,
                "Phone Number",
                errors.phoneNumber
              )}
              {this.renderInput(
                "address",
                data.address,
                "Address",
                errors.address
              )}
              {
                <Gender
                  gender={gender}
                  hadelGenderChange={this.hadelGenderChange}
                />
              }

              {gender ? (
                <Autocomplete
                  onClickAuto={this.onClickAuto}
                  onChangeAuto={this.onChangeAuto}
                  onKeyDownAuto={this.onKeyDownAuto}
                  suggestions={this.state.suggestions}
                  showSuggestions={showSuggestions}
                  activeSuggestion={activeSuggestion}
                  filteredSuggestions={filteredSuggestions}
                  renderInput={this.renderInput}
                  value={data.roomNo}
                  error={errors.roomNo}
                  suggestions={suggestions}
                  sex={sex}
                  building={building}
                />
              ) : null}

              {this.renderButton("Save")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default StudentForm;
