import React from "react";
import Form from "./../../form/form";
import { AddNotice } from "./../../../service/noticeServices/noticeServices";

class NoticeShow extends Form {
  state = {
    notice: {},
    classes: "form-control",
    disabled: true,
    btnClasses: "hide",
    genericError: ""
  };

  componentDidMount() {
    this.setState({
      notice: this.props.notice
    });
  }

  handelChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    const notice = { ...this.state.notice };
    notice[name] = value;
    this.setState({ notice });
  };

  handelEdit = () => {
    const { disabled } = this.state;

    if (disabled) {
      this.setState({ disabled: false, btnClasses: "" });
    } else {
      this.setState({ disabled: true, btnClasses: "hide" });
    }
  };

  handelSubmit = e => {
    e.preventDefault();
    this.dosubmit();
  };

  dosubmit = async () => {
    try {
      const { notice } = this.state;
      if (notice.title.length < 3 || notice.description.length < 10) {
        this.setState({
          genericError:
            "Title length must be greater than 3 and description should greater than 10"
        });
      } else {
        await AddNotice(notice);
        this.setState({
          disabled: true,
          btnClasses: "hide",
          genericError: ""
        });
      }
    } catch (error) {}
  };

  render() {
    const { notice, classes, disabled, btnClasses, genericError } = this.state;
    return (
      <div className="row section-large">
        <div className="col-6">
          <form className="form mb-5" onSubmit={this.handelSubmit}>
            <div className="text-info">{genericError}</div>
            <div className="form-group">
              <input
                type="text"
                name="title"
                disabled={disabled}
                value={notice.title}
                className={classes}
                onChange={this.handelChange}
              />
            </div>
            <div className="form-group">
              <textarea
                cols="30"
                disabled={disabled}
                className={classes}
                rows="10"
                name="description"
                value={notice.description}
                onChange={this.handelChange}
              ></textarea>
            </div>
            <div className={btnClasses}>{this.renderButton("Save")}</div>
          </form>
        </div>
        <div className="col-3">
          <div className="update-btn  ml-3">
            <i
              class="fa fa-pencil-square-o"
              onClick={() => this.handelEdit()}
              aria-hidden="true"
            ></i>
          </div>
          <div className="delete-btn  ml-3">
            <i
              class="fa fa-trash-o"
              onClick={() => this.props.handelDelete(notice.id)}
              aria-hidden="true"
            ></i>
          </div>
        </div>
      </div>
    );
  }
}

export default NoticeShow;
