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
import bootbox from "bootbox";
import $ from "jquery";
import {
  GetMeals,
  ExtraMeal,
  UpdateMeal
} from "../../../service/mealServices/mealServices";
class FoodMenu extends Component {
  state = {
    data: [],
    pageSize: 4,
    currentPage: 1,
    query: "",
    loader: true,
    mealMenus: []
  };

  async componentDidMount() {
    try {
      const { data } = await GetFoodMenus();
      const { data: meals } = await GetMeals();
      let mealMenus = [];
      meals.map(m =>
        mealMenus.push({ name: m.name, id: m.foodMenu.id, mealId: m.id })
      );

      if (data) this.setState({ data, mealMenus, loader: false });
    } catch (error) {
      console.log(error.response);
    }
  }

  handleExtra = id => {
    bootbox.prompt({
      title: "How Many Extra Meal You Want To Add?",
      centerVertical: true,
      callback: async result => {
        if (result) {
          this.setState({ loader: true });
          try {
            const data = {
              mealId: id,
              numbers: result
            };
            await ExtraMeal(data);
            this.setState({ loader: false });
          } catch (error) {
            this.setState({ loader: false });
          }
        }
      }
    });
  };

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

  handelAssign = id => {
    bootbox
      .prompt({
        title: "Meal for",
        inputType: "select",
        inputOptions: [
          {
            text: "Breakfast",
            value: "3"
          },
          {
            text: "Lunch",
            value: "4"
          },
          {
            text: "Dinner",
            value: "5"
          }
        ],
        callback: async result => {
          if (result) {
            this.setState({ loader: true });
            try {
              const data = { mealId: result, foodMenuId: id };
              const { data: rees } = await UpdateMeal(data);
              if (rees) {
                const { data: meals } = await GetMeals();
                let mealMenus = [];
                meals.map(m =>
                  mealMenus.push({
                    name: m.name,
                    id: m.foodMenu.id,
                    mealId: m.id
                  })
                );
                this.setState({ mealMenus, loader: false });
              }
            } catch (error) {}
          }
        }
      })
      .find(".modal-content")
      .css({
        width: "70rem",
        height: "15rem",
        "font-size": "2rem",
        "margin-top": function() {
          var w = $(window).height();
          var b = $(".modal-dialog").height();
          // should not be (w-h)/2
          var h = (w - b) / 3;
          return h + "px";
        }
      });
  };

  render() {
    const {
      loader,
      pageSize,
      data,
      mealMenus,
      currentPage,
      query
    } = this.state;

    let item = query.trim()
      ? data.filter(m =>
          m.name.toLowerCase().includes(query.toLowerCase().trim())
        )
      : data;

    const count = item.length;

    const menus = Paginate(item, pageSize, currentPage);
    return (
      <div className="section-card">
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
                <MenuCard
                  menu={menu}
                  mealMenus={mealMenus}
                  handelAssign={this.handelAssign}
                  handelDelete={this.handelDelete}
                  handleExtra={this.handleExtra}
                />
              ))}
            </div>
            <div className="ml-5 70 margin-top-lg">
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
