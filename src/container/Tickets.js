import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersSelector } from "../features/users/UserSlice";
import { setTicketsState } from "../features/tickets/TicketsSlice";
import ticketServices from "../services/tickets";
import TicketsComponent from "../components/TicketsComponent";
import generatePDF from "../services/reportGenerator";

const Tickets = () => {
  const { user } = useSelector(usersSelector);
  const [tickets, setTickets] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllTickets = async () => {
      try {
        const response = await ticketServices.getAllTickets(user.token);

        setTickets(response.data.tickets);
        dispatch(setTicketsState(response.data.tickets));
      } catch (err) {
        console.log("error");
      }
    };
    getAllTickets();
  }, [user.token, dispatch]);

  return (
    <div>
      <div className="container mb-4 mt-4 p-3">
        <div className="row">
          {user.user.role !== "admin" ? (
            <> </>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => generatePDF(tickets)}
            >
              Click to generate report
            </button>
          )}
        </div>
      </div>
      <TicketsComponent tickets={tickets} />
    </div>
  );
};

export default Tickets;
