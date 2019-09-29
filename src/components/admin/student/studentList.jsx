import React, { Component } from "react";
import Table from "../../table/table";
import Pagination from "../../pagination/pagination";
import Paginate from "../../common/paginate/paginate";
import _ from "lodash";
import SearchBox from "../../form-elements/search";
import {
  GetStudents,
  DeleteStudent
} from "./../../../service/studentServices/studentServices";
import Spiner from "./../../spiner/spiner";
import { Link } from "react-router-dom";

class StudentList extends Component {
  state = {
    data: [],
    pageSize: 8,
    currentPage: 1,
    currentOrder: {
      name: "name",
      order: "asc"
    },
    query: "",
    loader: true
  };

  headerNames = [
    {
      label: "Name",
      content: student => (
        <Link to={"/admin/student/" + student.id}>{student.name}</Link>
      )
    },
    { label: "Id", path: "roll" },
    { label: "Room No", path: "roomNo" },
    { label: "Address", path: "address" },
    { label: "Phone", path: "phoneNumber" },
    { label: "Deu", path: "deuAmount" }
  ];

  redirectTo = item => {
    this.props.history.push("/admin/addfood/" + item.id);
  };

  async componentDidMount() {
    try {
      const { data } = await GetStudents();
      if (data) this.setState({ data, loader: false });
    } catch (error) {
      console.log(error.response);
      this.setState({ loader: false });
    }
  }

  handelQuery = e => {
    const query = e.currentTarget.value;
    this.setState({ query, currentPage: 1 });
  };

  handelOrder = path => {
    const currentOrder = { ...this.state.currentOrder };
    if (currentOrder.name === path && currentOrder.order === "asc")
      currentOrder.order = "desc";
    else currentOrder.order = "asc";

    currentOrder.name = path;

    this.setState({ currentOrder });
  };

  handelPageChange = pagenum => {
    this.setState({ currentPage: pagenum });
  };

  render() {
    const {
      loader,
      pageSize,
      data,
      currentPage,
      currentOrder,
      query
    } = this.state;

    let item = query.trim()
      ? data.filter(
          f =>
            f.name.toLowerCase().includes(query.toLowerCase().trim()) ||
            f.roll.toString().includes(query.trim())
        )
      : data;

    const count = item.length;

    const food = Paginate(item, pageSize, currentPage);
    const filterdFood = _.orderBy(food, currentOrder.name, currentOrder.order);
    return (
      <div className="form section-card paddingLR">
        <Spiner loader={this.state.loader} />
        <React.Fragment>
          <SearchBox onQuery={this.handelQuery} query={query} />
          <Table
            headerNames={this.headerNames}
            onDelete={this.handelDelete}
            data={filterdFood}
            redirectTo={this.redirectTo}
            orderBy={this.handelOrder}
          />
          <Pagination
            onPageChange={this.handelPageChange}
            pageSize={pageSize}
            count={count}
            currentPage={currentPage}
          />
        </React.Fragment>
      </div>
    );
  }
}

export default StudentList;
