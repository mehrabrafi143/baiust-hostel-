import http from "../http";
import { apiEndpoint } from "../config.json";

const api = apiEndpoint + "/api/sit";

export function GetSits(id) {
  return http.get(apiEndpoint + "/api/sitname?id=" + id);
}
