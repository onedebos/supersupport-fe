import axios from "axios";
const apiUrl = "http://localhost:3000/api/v1";

const createComment = (ticketId, token, data) => {
  return axios.post(`${apiUrl}/tickets/${ticketId}/comments`, data, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export default {
  createComment: createComment
};
