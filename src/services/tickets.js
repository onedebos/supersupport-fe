import axios from "axios";
const apiUrl = "https://supersupportapi.herokuapp.com/api/v1";

const getAllTickets = token => {
  return axios.get(`${apiUrl}/tickets`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const getCustomersTicket = token => {
  return axios.get(`${apiUrl}/usertickets`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const getSpecificTicket = (ticketId, token) => {
  return axios.get(`${apiUrl}/tickets/${ticketId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const createTicket = (token, data) => {
  return axios.post(`${apiUrl}/tickets`, data, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const updateTicket = (ticketId, token, data) => {
  return axios.put(`${apiUrl}/tickets/${ticketId}`, data, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const deleteTicket = (ticketId, token) => {
  return axios.delete(`${apiUrl}/tickets/${ticketId}`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export default {
  getAllTickets: getAllTickets,
  getCustomersTicket: getCustomersTicket,
  createTicket: createTicket,
  getSpecificTicket: getSpecificTicket,
  updateTicket: updateTicket,
  deleteTicket: deleteTicket
};
