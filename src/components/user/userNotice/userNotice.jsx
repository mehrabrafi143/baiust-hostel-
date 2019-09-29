import React, { Component } from "react";
import { GetNotices } from "./../../../service/noticeServices/noticeServices";
import Spiner from "./../../spiner/spiner";
import Paginate from "./../../common/paginate/paginate";
import Pagination from "../../pagination/pagination";
import moment from "moment";
import { Link } from "react-router-dom";
class UserNotice extends Component {
  state = {
    notices: [],
    loader: false,
    pageSize: 3,
    currentPage: 1
  };

  handelPageChange = pagenum => {
    this.setState({ currentPage: pagenum });
  };

  async componentDidMount() {
    try {
      this.setState({ loader: true });
      const { data: notices } = await GetNotices();
      this.setState({ notices, loader: false });
    } catch (error) {
      this.setState({ loader: false });
    }
  }
  render() {
    const { loader, notices, currentPage, pageSize } = this.state;
    const data = Paginate(notices, pageSize, currentPage);
    const count = notices.length;
    return (
      <div className="userSection">
        <Spiner loader={loader} />
        <ul className="user-notice">
          {data.map(notice => (
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
          ))}
          <div className="">
            <Pagination
              onPageChange={this.handelPageChange}
              pageSize={pageSize}
              count={count}
              currentPage={currentPage}
            />
          </div>
        </ul>
      </div>
    );
  }
}

export default UserNotice;
