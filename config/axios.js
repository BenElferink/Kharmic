import axios from "axios";

// create api config (needs the token on most requests)
const Axios = (token) => {
  return axios.create({
    baseURL: process.env.API_URI,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export default Axios;
