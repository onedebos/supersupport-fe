import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { usersSelector } from "../features/users/UserSlice";
import ticketServices from "../services/tickets";
import TicketsComponent from "../components/TicketsComponent";

const Tickets = () => {
  const { user } = useSelector(usersSelector);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const getAllTickets = async () => {
      try {
        const response = await ticketServices.getAllTickets(user.token);

        setTickets(response.data.tickets);
      } catch (err) {
        console.log("error");
      }
    };
    getAllTickets();
  }, [user.token]);

  return (
    <div>
      <TicketsComponent tickets={tickets} />
    </div>
  );
};

export default Tickets;
