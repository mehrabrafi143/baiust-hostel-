import queryString from "query-string";
import { apiEndpoint } from "../config.json";
import http from "../../service/http";

export function login({ email, password }) {
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

  return http.post(apiEndpoint + "/token", data, config);
}

export function registration(data) {
  return http.post(apiEndpoint + "/api/account/register", data);
}
