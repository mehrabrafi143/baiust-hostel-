import React, { Component } from "react";
import Table from "../../table/table";
import Pagination from "../../pagination/pagination";
import Paginate from "../../common/paginate/paginate";
import _ from "lodash";
import SearchBox from "../../form-elements/search";
import {
  GetSitByGender,
  DeleteSit
} from "./../../../service/sitServices/sitServices";
import Spiner from "../../spiner/spiner";
import Gender from "./../gender/gender";
class Sits extends Component {
  state = {
    data: [],
    pageSize: 8,
    currentPage: 1,
    currentOrder: {
      name: "name",
      order: "asc"
    },
    genderId: "1",
    query: "",
    loader: true
  };

  headerNames = [
    { label: "Room Name", path: "name" },
    { label: "Gender", path: "gender.name" },
    { label: "Capacity", path: "capacity" },
    { label: "Occupied", path: "occupiedSit" },
    { label: "Electricity Bill", path: "electricityBill" },
    { label: "Electricity Bill/Head", path: "electricityBillPerHead" },
    {
      key: "delete",
      content: item => (
        <span
          className="delete-btn text-sm"
          onClick={() => this.handelDelete(item)}
        >
          <i class="fa fa-trash-o" aria-hidden="true"></i>
        </span>
      )
    },
    {
      key: "update",
      content: item => (
        <span
          className="update-btn text-sm"
          onClick={() => this.redirectTo(item)}
        >
          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
        </span>
      )
    }
  ];

  hadelGenderChange = async ({ currentTarget }) => {
    const { genderId: oldId } = this.state;
    if (oldId !== currentTarget["value"]) {
      const { data } = await GetSitByGender(currentTarget["value"]);
      if (data) this.setState({ data, genderId: currentTarget["value"] });
    }
  };

  handelDelete = async item => {
    const originalState = this.state.data;
    try {
      let data = [...this.state.data];
      data = data.filter(d => d.id !== item.id);
      this.setState({ data });
      await DeleteSit(item.id);
    } catch (error) {
      this.setState({ data: originalState, loader: false });
      console.log(error);
    }
  };

  redirectTo = item => {
    this.props.history.push("/admin/sitsform/" + item.id);
  };

  async componentDidMount() {
    try {
      const { data } = await GetSitByGender(this.state.genderId);
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
      query,
      genderId
    } = this.state;

    let item = query.trim()
      ? data.filter(f =>
          f.name.toLowerCase().includes(query.toLowerCase().trim())
        )
      : data;

    const count = item.length;

    const food = Paginate(item, pageSize, currentPage);
    const filterdFood = _.orderBy(food, currentOrder.name, currentOrder.order);
    return (
      <div className="white-section">
        <div className="enter-padding">
          <Spiner loader={loader} />
          <h2 className="section-title">Sit information</h2>
          <SearchBox onQuery={this.handelQuery} query={query} />
          <Gender hadelGenderChange={this.hadelGenderChange} />
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
        </div>
      </div>
    );
  }
}

export default Sits;
