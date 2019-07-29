import React, { Component } from "react";
import SearchBox from "./../../form-elements/search";
import MenuCard from "./menuCard/menuCard";
import {
  GetFoodMenus,
  DeleteFoodMenu
} from "./../../../service/foodMenuService/foodMenuService";
import Pagination from "../../pagination/pagination";
import Paginate from "../../common/paginate/paginate";
import Loader from "react-loader-spinner";
class FoodMenu extends Component {
  state = {
    data: [],
    pageSize: 4,
    currentPage: 1,
    query: "",
    loader: true
  };

  async componentDidMount() {
    try {
      const { data } = await GetFoodMenus();
      if (data) this.setState({ data, loader: false });
    } catch (error) {
      console.log(error.response);
    }
  }

  handelPageChange = pagenum => {
    this.setState({ currentPage: pagenum });
  };

  handelQuery = e => {
    const query = e.currentTarget.value;
    this.setState({ query, currentPage: 1 });
  };

  handelDelete = async id => {
    this.setState({ loader: true });
    try {
      let { data } = this.state;
      data = data.filter(f => f.id !== id);
      this.setState({ data });
      const { data: response } = await DeleteFoodMenu(id);
      if (response) this.setState({ loader: false });
    } catch (error) {}
  };

  render() {
    const { loader, pageSize, data, currentPage, query } = this.state;

    let item = query.trim()
      ? data.filter(m =>
          m.name.toLowerCase().includes(query.toLowerCase().trim())
        )
      : data;

    const count = item.length;

    const menus = Paginate(item, pageSize, currentPage);
    return (
      <div className="section-card ">
        {loader ? (
          <div className="full-body">
            <div className="center">
              <Loader type="Oval" color="#1B3A5E" height={60} width={60} />
              <p className="mt-2">
                <b> loading...</b>
              </p>
            </div>
          </div>
        ) : (
          <React.Fragment>
            <SearchBox onQuery={this.handelQuery} query={query} />
            <div className="mt-3 flex">
              {menus.map(menu => (
                <MenuCard menu={menu} handelDelete={this.handelDelete} />
              ))}
            </div>
            <div className="ml-5 mt-4">
              <Pagination
                onPageChange={this.handelPageChange}
                pageSize={pageSize}
                count={count}
                currentPage={currentPage}
              />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default FoodMenu;
