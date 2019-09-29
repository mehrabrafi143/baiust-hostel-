import http from "../http";
import { apiEndpoint } from "../config.json";

const api = apiEndpoint + "/api/studentsPay";

export function StudentsPay(data) {
  return http.post(api, data);
}
