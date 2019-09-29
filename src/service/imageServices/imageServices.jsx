import http from "../http";
import { apiEndpoint } from "../config.json";

const api = apiEndpoint + "/api/ImageUpload";

export function GetImage(id) {
  return http.get(api + "?id=" + id);
}
