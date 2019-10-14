import React from "react";
import Joi from "joi-browser";
import Form from "../../form/form";
import {
  AddNotice,
  GetNotices,
  DeleteNotice
} from "./../../../service/noticeServices/noticeServices";
import Spiner from "../../spiner/spiner";
import NoticeShow from "./noticeShow";
import bootbox from "bootbox";
import { toast } from "react-toastify";

class Notice extends Form {
  state = {
    data: {
      title: "",
      description: ""
    },

    errors: {
      title: "",
      description: ""
    },
    loader: false,
    genericErrors: "",
    notices: []
  };

  schema = {
    title: Joi.string()
      .required()
      .max(20)
      .min(3),
    description: Joi.string()
      .required()
      .max(500)
      .min(5)
  };

  handelSubmit = e => {
    e.preventDefault();
  };

  handelDelete = id => {
    bootbox.confirm("Are you sure?", async res => {
      const { notices: oldNotices } = this.state;
      if (res) {
        this.setState({ loader: true });

        const { data: result } = await DeleteNotice(id);
        const notices = oldNotices.filter(n => n.id !== id);
        if (result) {
          this.setState({ notices, loader: false });
        } else {
          toast.error("something went wrong");
          this.setState({ notices: oldNotices, loader: false });
        }
      }
    });
  };

  submit = async () => {
    this.setState({ loader: true });

    try {
      const { data, notices } = this.state;
      const clear = {
        title: "",
        description: ""
      };

      const { data: res } = await AddNotice(data);

      if (res) {
        notices.push(res);
        this.setState({ loader: false, notices, data: clear });
      }
    } catch (error) {
      this.setState({
        loader: false
      });
    }
  };

  async componentDidMount() {
    try {
      this.setState({ loader: true });
      const { data: notices } = await GetNotices();
      if (notices || []) this.setState({ notices, loader: false });
    } catch (e) {
      this.setState({ loader: false });
    }
  }

  render() {
    const { data, errors, loader, notices } = this.state;
    return (
      <div className="white-section">
        <div className="enter-padding">
          <Spiner loader={loader} />
          <h2 className="section-title"> Post A Notice</h2>
          <p className="form-text text-danger">{this.state.genericErrors}</p>
          <form className="form" onSubmit={this.handelSubmit}>
            {this.renderInput("title", data.title, "Enter Title", errors.title)}

            {this.renderTextarea(
              "description",
              data.description,
              "Enter Description",
              errors.description
            )}
            <button className="btn btn-primary" onClick={this.submit}>
              Create
            </button>
          </form>
          <div className="margin-top-lg">
            {notices ? (
              notices.map(notice => (
                <NoticeShow notice={notice} handelDelete={this.handelDelete} />
              ))
            ) : (
              <div className="text-info">no notice created yet!</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Notice;
