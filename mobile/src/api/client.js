import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:5000", // ⚡ change if backend on another host
});

export default client;
