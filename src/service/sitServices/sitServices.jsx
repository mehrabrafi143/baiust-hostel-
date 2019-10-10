import http from "../http";
import { apiEndpoint } from "../config.json";

const api = apiEndpoint + "/api/sit";

export function GetSitNameByGender(id) {
  return http.get(apiEndpoint + "/api/sitname?id=" + id);
}

export function GetSitByGender(id) {
  return http.get(apiEndpoint + "/api/sitbygender?id=" + id);
}

export function DeleteSit(id) {
  return http.delete(api + "/" + id);
}

export function GetSit(id) {
  return http.get(api + "/" + id);
}
export function AddSit(data) {
  return http.post(api, data);
}

export function ElectricBillPay(data) {
  return http.post(apiEndpoint + "/api/electricBill", data);
}
