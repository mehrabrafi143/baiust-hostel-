import queryString from "query-string";
import { apiEndpoint } from "../config.json";
import http from "../../service/http";
import axios from "axios";

export async function login({ email, password }) {
  const data = queryString.stringify({
    userName: email,
    password: password,
    grant_type: "password"
  });
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  delete axios.defaults.headers.common["Authorization"];

  try {
    const { data: jwt } = await http.post(apiEndpoint + "/token", data, config);
    localStorage.setItem("token", jwt.access_token);
    localStorage.setItem("username", jwt.userName);
    localStorage.setItem(
      "roles",
      jwt.roles.slice(2, jwt.roles.lastIndexOf('"'))
    );
    return "";
  } catch (error) {
    return "Username and password don't match!";
  }
}

export function registration(data) {
  return http.post(apiEndpoint + "/api/account/register", data);
}

export function logout() {
  localStorage.removeItem("username");
  localStorage.removeItem("token");
  localStorage.removeItem("roles");
}

export function getToken() {
  return localStorage.getItem("token");
}
export function getUserName() {
  return localStorage.getItem("username");
}
export function getUserRole() {
  return localStorage.getItem("roles");
}
