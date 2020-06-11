import React, { useState, useEffect } from "react";
import ticketServices from "../services/tickets";
import { useSelector } from "react-redux";
import { usersSelector } from "../features/users/UserSlice";

const Ticket = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [ticket, setTicket] = useState();
  const { user } = useSelector(usersSelector);

  const id = match.params.id;

  useEffect(() => {
    const getTicketById = async () => {
      try {
        setIsLoaded(false);
        const response = await ticketServices.getCustomersTicket(
          id,
          user.token
        );
        setIsLoaded(true);
        setTicket(response.data);
      } catch (err) {
        console.log("error");
      }
    };
    getTicketById();
  }, [id, user.token]);

  return <div>{!isLoaded ? "Loading ticket...." : <div>loaded </div>}</div>;
};

export default Ticket;
