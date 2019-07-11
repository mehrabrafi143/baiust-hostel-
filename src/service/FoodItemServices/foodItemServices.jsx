import http from "../http";
import { apiEndpoint } from "../config.json";

const api = apiEndpoint + "/api/fooditem";

export function AddFoodItem(data) {
  return http.post(api, data);
}

export function GetFoodItems() {
  return http.get(api);
}

export function GetFoodItem(id) {
  return http.get(api + "/" + id);
}

export function DeleteItem(id) {
  return http.delete(api + "/" + id);
}
