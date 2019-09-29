import http from "../http";
import { apiEndpoint } from "../config.json";

const api = apiEndpoint + "/api/student";

export function AddStudent(data) {
  return http.post(api, data);
}

export function GetStudents() {
  return http.get(api);
}

export function GetStudent(id) {
  return http.get(apiEndpoint + "/api/get?username=" + id);
}

export function GetStudentById(id) {
  return http.get(api + "/" + id);
}

export function DeleteStudent(id) {
  return http.delete(api + "/" + id);
}
