import http from "../http";
import { apiEndpoint } from "../config.json";

const api = apiEndpoint + "/api/MonthlyBill";

export function AddMonthlyBill(data) {
  return http.post(api, data);
}

export function AddStudentMonthlyBills() {
  return http.post(api);
}
