import axios from "axios";
const apiUrl = "http://localhost:3000/api/v1";

const getAllUsers = token => {
  return axios.get(`${apiUrl}/users`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const updateUserRole = (userId, role, token) => {
  return axios.put(
    `${apiUrl}/users/${userId}`,
    { role: role },
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
  updateUserRole: updateUserRole
};
