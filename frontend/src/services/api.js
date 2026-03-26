import axios from "axios";

const API = axios.create({
  baseURL: "https://jk-surgical-backend.onrender.com/"
});

export default API;
