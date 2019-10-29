import React from "react";
import Form from "./../../form/form";
import Joi from "joi-browser";
import Gender from "../gender/gender";
import Spiner from "./../../spiner/spiner";
import { AddSit, GetSit } from "../../../service/sitServices/sitServices";
import { Link } from "react-router-dom";
class SitForm extends Form {
  state = {
    data: {
      name: "",
      capacity: "",
      genderId: ""
    },
    id: 0,
    errors: {
      name: "",
      capacity: "",
      genderId: ""
    },
    genericErrors: "",
    loader: false
  };

  hadelGenderChange = async ({ currentTarget }) => {
    const { data } = this.state;
    data.genderId = currentTarget["value"];

    this.setState({ data });
  };

  async componentDidMount() {
    try {
      const id = this.props.match.params.id;
      this.setState({ id });
      if (id) {
        const { data } = (await GetSit(id)) || {};
        this.setState({
          data: {
            name: data.name,
            capacity: data.capacity || "",
            genderId: data.genderId || ""
          }
        });
      }
    } catch (error) {}
  }

  schema = {
    name: Joi.string()
      .required()
      .label("Name"),
    capacity: Joi.number().label("Capacity"),
    genderId: Joi.number().label("genderId")
  };

  dosubmit = async () => {
    try {
      const data = { ...this.state.data };
      data.id = this.state.id;
      await AddSit(data);
      this.props.history.goBack();
    } catch (error) {
      console.log();
      this.ShowCustomeServerErrors(error.response);
      this.setState({ loader: false });
    }
  };

  render() {
    const { data, errors, loader, id, genericErrors } = this.state;
    return (
      <div className="white-section">
        <div className="enter-padding">
          <Spiner loader={loader} />
          <h2 className="section-title">Enter seat Details </h2>
          <p>{genericErrors}</p>
          {id ? (
            <span className="text-right">
              <Link
                className="update-btn text-sm text-right"
                to={"/admin/electrilbill/" + id}
              >
                <i class="fa fa-money" aria-hidden="true"></i> Monthly Electric
                Bill
              </Link>
            </span>
          ) : null}
          <p className="form-text text-danger">{this.state.genericErrors}</p>
          <form className="form" onSubmit={this.handelSubmit}>
            {this.renderInput(
              "name",
              data.name,
              "Enter Room Number",
              errors.name
            )}
            {this.renderInput(
              "capacity",
              data.capacity,
              "Enter Room Capacity",
              errors.capacity
            )}
            <Gender hadelGenderChange={this.hadelGenderChange} />
            {this.renderButton("Add")}
          </form>
        </div>
      </div>
    );
  }
}

export default SitForm;
