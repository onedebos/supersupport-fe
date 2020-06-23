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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCustTickets = async () => {
      setIsLoading(true);
      try {
        const response = await ticketServices.getCustomersTicket(user.token);
        setIsLoading(false);
        setTickets(response.data.tickets);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getCustTickets();
  }, [user.token]);

  return (
    <Container className="m-auto mb-4">
      <Row className="justify-content-center mt-4">
        <Col sm={8}>
          {tickets && !isLoading ? <TicketsComponent tickets={tickets} /> : ""}
          {isLoading ? "Attempting to Load your tickets..." : ""}
          {!tickets && !isLoading ? (
            <div className="font-weight-bold">
              You currently have no tickets created
            </div>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MyTickets;
