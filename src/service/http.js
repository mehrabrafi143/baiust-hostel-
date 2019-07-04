import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {
  const val =
    error.response &&
    error.response.status <= 400 &&
    error.response.status < 500;
  if (!val) {
    toast("someting went wrong");
  }
  return Promise.reject(error);
});

export default {
  post: axios.post,
  get: axios.get,
  put: axios.put,
  delete: axios.delete
};
