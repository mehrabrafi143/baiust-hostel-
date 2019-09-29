import http from "../http";
import { apiEndpoint } from "../config.json";

const api = apiEndpoint + "/api/notice";

export function AddNotice(data) {
  return http.post(api, data);
}

export function GetNotices() {
  return http.get(api);
}

export function GetNotice(id) {
  return http.get(api + "/" + id);
}

export function DeleteNotice(id) {
  return http.delete(api + "/" + id);
}
