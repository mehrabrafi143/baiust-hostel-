import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ReadNotifications } from "../../../../service/notificationServices/notificationServices";
import { RecentNotifications } from "./../../../../service/notificationServices/notificationServices";
class Modal extends Component {
  state = {
    classes: "notificationModel hide",
    recentNotification: []
  };

  async componentDidMount() {
    const count = this.props.notifications.length;
    this.setState({ count });
  }
  handelClick = async () => {
    const id = localStorage.getItem("studentId");
    if (this.state.classes === "notificationModel hide") {
      this.props.setCount();

      this.setState({ classes: "notificationModel" });
      const { data } = await ReadNotifications(id);
    } else this.setState({ classes: "notificationModel hide" });
  };

  async componentWillMount() {
    const id = localStorage.getItem("studentId");
    const { data: recentNotification } = await RecentNotifications(id);
    this.setState({ recentNotification });
  }

  render() {
    return (
      <React.Fragment>
        <li className="nav-item" onClick={this.handelClick} id="notification">
          <Link className="nav-link">
            <i className="fa fa-globe" />
            <span class="badge badge-danger animated shake text-medium">
              {this.props.count}
            </span>
          </Link>

          <div className={this.state.classes}>
            <div className="notificationModel-header">Notification</div>
            <ul className="notificationModel-item">
              {this.props.notifications.length
                ? this.props.notifications.map(n => {
                    if (n.notificationType === 1) {
                      return (
                        <li>
                          A notice has been created titled{" "}
                          <Link
                            to={"/user/notice/" + n.notice.id}
                            className="user-notice_title"
                          >
                            "
                            {n.notice.title
                              .split(" ")
                              .slice(0, 2)
                              .join(" ")}
                            "{" "}
                          </Link>
                        </li>
                      );
                    }
                    if (n.notificationType === 2) {
                      return (
                        <li>
                          A notice has been updated titled{" "}
                          <Link
                            to={"/user/notice/" + n.notice.id}
                            className="user-notice_title"
                          >
                            "
                            {
                              n.notice.title
                              // .split(" ")
                              // .slice(0, 3)
                              // .join(" ")
                            }
                            "
                          </Link>{" "}
                          was titled{" "}
                          <Link
                            to={"/user/notice/" + n.notice.id}
                            className="user-notice_title"
                          >
                            {n.originalTitle}
                          </Link>
                        </li>
                      );
                    }
                  })
                : this.state.recentNotification.map(n => {
                    if (n.notificationType === 1) {
                      return (
                        <li>
                          A notice has been created titled "
                          <Link
                            to={"/user/notice/" + n.notice.id}
                            className="user-notice_title"
                          >
                            {n.notice.title
                              .split(" ")
                              .slice(0, 2)
                              .join(" ")}
                          </Link>
                          "
                        </li>
                      );
                    }
                    if (n.notificationType === 2) {
                      return (
                        <li>
                          A notice has been updated titled{" "}
                          <Link
                            className="user-notice_title"
                            to={"/user/notice/" + n.notice.id}
                          >
                            "
                            {
                              n.notice.title
                              // .split(" ")
                              // .slice(0, 2)
                              // .join(" ")
                            }
                            "{" "}
                          </Link>{" "}
                          was titled{" "}
                          <Link
                            className="user-notice_title"
                            to={"/user/notice/" + n.notice.id}
                          >
                            {n.originalTitle}
                          </Link>
                        </li>
                      );
                    }
                  })}
            </ul>
          </div>
        </li>
      </React.Fragment>
    );
  }
}

export default Modal;
