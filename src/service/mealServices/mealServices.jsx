import http from "../http";
import { apiEndpoint } from "../config.json";

const api = apiEndpoint + "/api/meal";

export function UpdateMeal(data) {
  return http.post(api, data);
}

export function GetMeals() {
  return http.get(api);
}

export function GetMeal(id) {
  return http.get(api + "/" + id);
}

export function AddMeal(data) {
  return http.post(api + "/studentmeal", data);
}

export function RemoveMeal(data) {
  return http.post(api + "/CancelStudentMeal", data);
}

export function TakenMeal(id) {
  return http.get(api + "/taken?id=" + id);
}

export function ExtraMeal(data) {
  return http.post(api + "/extra/", data);
}

export function MealCount() {
  return http.get(apiEndpoint + "/api/meal/meals");
}
