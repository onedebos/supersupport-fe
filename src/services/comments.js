import axios from "axios";
const apiUrl = "https://supersupportapi.herokuapp.com/api/v1/";

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
