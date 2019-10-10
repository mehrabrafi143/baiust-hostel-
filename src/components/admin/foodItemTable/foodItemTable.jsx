import React, { Component } from "react";
import Table from "../../table/table";
import { GetFoodItems } from "../../../service/FoodItemServices/foodItemServices";
import { DeleteItem } from "../../../service/FoodItemServices/foodItemServices";
import Pagination from "../../pagination/pagination";
import Paginate from "../../common/paginate/paginate";
import _ from "lodash";
import SearchBox from "../../form-elements/search";
import Loader from "react-loader-spinner";
import Spiner from "../../spiner/spiner";
class FoodItemTable extends Component {
  state = {
    data: [],
    pageSize: 15,
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

  handelDelete = async item => {
    const originalState = this.state.data;
    try {
      let data = [...this.state.data];
      data = data.filter(d => d.id !== item.id);
      this.setState({ data });
      await DeleteItem(item.id);
    } catch (error) {
      this.setState({ data: originalState, loader: false });
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

export default FoodItemTable;
