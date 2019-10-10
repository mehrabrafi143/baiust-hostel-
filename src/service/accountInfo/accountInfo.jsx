import http from "../http";
import { apiEndpoint } from "../config.json";

export function GetTotalMealPrice() {
  return http.get(apiEndpoint + "/api/totalMealprice");
}

export function GetDeu() {
  return http.get(apiEndpoint + "/api/totalDeu");
}

export function GetPaid() {
  return http.get(apiEndpoint + "/api/totalpaid");
}

export function AddMonthlyBill(data) {
  return http.post(apiEndpoint + "/api/monthlyBill", data);
}
