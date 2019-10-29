import React, { Component } from "react";
import Table from "../../table/table";
import Pagination from "../../pagination/pagination";
import Paginate from "../../common/paginate/paginate";
import _ from "lodash";
import SearchBox from "../../form-elements/search";
import Spiner from "../../spiner/spiner";
import { GetMealTokens } from "./../../../service/mealServices/mealServices";

class MealTokens extends Component {
  state = {
    data: [],
    pageSize: 10,
    currentPage: 1,
    currentOrder: {
      name: "name",
      order: "asc"
    },
    query: "",
    loader: true
  };

  headerNames = [
    { label: "Student Name", path: "studentName" },
    { label: "Student Id", path: "studentId" },
    { label: "Meal Type", path: "mealId" },
    { label: "Token", path: "token" }
  ];

  async componentDidMount() {
    try {
      const { data } = await GetMealTokens();
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
      ? data.filter(f =>
          f.name.toLowerCase().includes(query.toLowerCase().trim())
        )
      : data;

    const count = item.length;

    const food = Paginate(item, pageSize, currentPage);
    const filterdFood = _.orderBy(food, currentOrder.name, currentOrder.order);
    return (
      <div className="white-section">
        <Spiner loader={loader} />
        <div className="enter-padding">
          <div className="section-title">Meal Tokens</div>
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
        </div>
        }
      </div>
    );
  }
}

export default MealTokens;
