import axios from "axios";
import { apiRoot } from "./const";

export default axios.create({
  baseURL: `${apiRoot}fetch/`,
});
