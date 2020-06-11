import React from "react";
import { useSelector } from "react-redux";
import { usersSelector } from "../features/users/UserSlice";
import { Link, Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Dashboard = () => {
  const { user } = useSelector(usersSelector);
  return (
    <Container className="m-auto mb-4">
      <Row className="justify-content-center mt-4">
        <Col sm={8}>
          <div className="jumbotron">
            <h1 className="display-4">Hi, {user.user.name}!</h1>
            <p className="lead">
              Get all the help you need at the click of a button.
            </p>
            <div className="my-4">
              <p>Let's get started!.</p>
              <p className="lead">
                <Link
                  to="/createticket"
                  className="btn btn-primary btn-lg"
                  href="#"
                  role="button"
                >
                  Create a ticket
                </Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
