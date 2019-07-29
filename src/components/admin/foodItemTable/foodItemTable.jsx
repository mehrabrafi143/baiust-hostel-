import React, { Component } from "react";
import Table from "../../table/table";
import { GetFoodItems } from "../../../service/FoodItemServices/foodItemServices";
import { DeleteItem } from "../../../service/FoodItemServices/foodItemServices";
import Pagination from "../../pagination/pagination";
import Paginate from "../../common/paginate/paginate";
import _ from "lodash";
import SearchBox from "../../form-elements/search";
import Loader from "react-loader-spinner";
class FoodItemTable extends Component {
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
    { label: "Food Name", path: "name" },
    { label: "Price/Kg", path: "pricePerKg" },
    { label: "People/Kg", path: "peoplePerKg" },
    { label: "Price/Head", path: "pricePerHead" },
    {
      key: "delete",
      content: item => (
        <span
          className="btn btn-danger hover"
          onClick={() => this.handelDelete(item)}
        >
          Delete
        </span>
      )
    },
    {
      key: "update",
      content: item => (
        <span
          className="btn btn-primary hover"
          onClick={() => this.redirectTo(item)}
        >
          Update
        </span>
      )
    }
  ];

  handelDelete = async item => {
    const originalState = this.state.data;
    try {
      let data = [...this.state.data];
      data = data.filter(d => d.id !== item.id);
      this.setState({ data });
      await DeleteItem(item.id);
    } catch (error) {
      this.setState({ data: originalState });
      console.log(error);
    }
  };

  redirectTo = item => {
    this.props.history.push("/admin/addfood/" + item.id);
  };

  async componentDidMount() {
    try {
      const { data } = await GetFoodItems();
      if (data) this.setState({ data, loader: false });
    } catch (error) {
      console.log(error.response);
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
      <div className="section-card">
        {loader ? (
          <div className="center">
            <Loader type="Oval" color="#1B3A5E" height={60} width={60} />
            <p className="mt-2">
              <b> loading...</b>
            </p>
          </div>
        ) : (
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
        )}
      </div>
    );
  }
}

export default FoodItemTable;
