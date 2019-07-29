import http from "../http";
import { apiEndpoint } from "../config.json";

const api = apiEndpoint + "/api/foodmenu";

export function AddFoodMenu(data) {
  return http.post(api, data);
}

export function GetFoodMenus() {
  return http.get(api);
}

export function GetFoodMenu(id) {
  return http.get(api + "/" + id);
}

export function DeleteFoodMenu(id) {
  return http.delete(api + "/" + id);
}

//deleting the items from menu

export function DeleteItem(data) {
  return http.post(apiEndpoint + "/api/removeItem/", data);
}
