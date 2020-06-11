import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { usersSelector } from "../features/users/UserSlice";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ticketServices from "../services/tickets";
import TicketsComponent from "../components/TicketsComponent";

const MyTickets = () => {
  const { user } = useSelector(usersSelector);
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    const getCustTickets = async () => {
      try {
        const response = await ticketServices.getCustomersTicket(user.token);
        setTickets(response.data.tickets);
      } catch (error) {
        setError("We couldn't find any tickets for this user.");
      }
    };
    getCustTickets();
  }, []);

  return (
    <Container className="m-auto mb-4">
      <Row className="justify-content-center mt-4">
        <Col sm={8}>
          <TicketsComponent tickets={tickets} />
          {error ? <div>{error}</div> : ""}
        </Col>
      </Row>
    </Container>
  );
};

export default MyTickets;
