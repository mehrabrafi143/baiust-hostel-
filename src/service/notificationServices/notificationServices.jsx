import http from "../http";
import { apiEndpoint } from "../config.json";

const api = apiEndpoint + "/api/notification";

export function GetNotifications(id) {
  return http.get(api + "/" + id);
}
export function ReadNotifications(id) {
  return http.post(api + "/" + id);
}

export function RecentNotifications(id) {
  return http.get(apiEndpoint + "/api/recentNotifications?id=" + id);
}
