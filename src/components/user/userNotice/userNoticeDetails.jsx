import React, { Component } from "react";
import { GetNotice } from "./../../../service/noticeServices/noticeServices";
import Spiner from "./../../spiner/spiner";
import { Link } from "react-router-dom";
import moment from "moment";

class NoticeDetails extends Component {
  state = {
    notice: {},
    loader: false,
    id: 0
  };
  async componentDidMount() {
    try {
      const { data: notice } = await GetNotice(this.props.match.params.id);
      if (notice)
        this.setState({
          notice,
          loader: false,
          id: this.props.match.params.id
        });
    } catch (error) {
      this.setState({ loader: false });
    }
  }
  render() {
    const { notice, loader } = this.state;
    if (this.props.match.params != this.state.id) {
      this.componentDidMount();
    }
    return (
      <div className="userSection">
        <Spiner loader={loader} />
        <ul className="user-notice">
          <li className="user-notice_body">
            <Link
              to={"/user/notice/" + notice.id}
              className="user-notice_title"
            >
              {notice.title}
              <span className="user-notice_date">
                {moment(notice.createdTime).fromNow()}
              </span>
            </Link>
            <div className="user-notice_des">{notice.description}</div>
          </li>
        </ul>
      </div>
    );
  }
}

export default NoticeDetails;
