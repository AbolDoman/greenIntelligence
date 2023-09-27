import axios from "axios";

// if we dont need to x-auth-token
export const AxiosInstance = () =>
  axios.create({
    baseURL: 'http://shserver.top:8080/test/users',
  });
export const AxiosInstanceWithXAuthToken = () =>
  axios.create({
    baseURL: 'http://shserver.top:8080/test/users',
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Ticket")}`,
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
