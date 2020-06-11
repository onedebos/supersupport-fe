import axios from "axios";
const apiUrl = "http://localhost:3000/api/v1";

const getAllUsers = token => {
  return axios.get(`${apiUrl}/users`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const makeUserAnAdmin = (userId, token) => {
  return axios.put(
    `${apiUrl}/tickets/${userId}`,
    { role: "admin" },
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};

export default {
  getAllUsers: getAllUsers,
  makeUserAnAdmin: makeUserAnAdmin
};
