import React, { useState } from "react";
import ticketServices from "../services/tickets";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { usersSelector } from "../features/users/UserSlice";

const CreateTicket = () => {
  const [title, setTitle] = useState("");
  const [request, setRequest] = useState("");
  const [completed, setCompleted] = useState("");
  const [errors, setError] = useState("");
  const [show, setShow] = useState(true);

  const { user } = useSelector(usersSelector);

  const handleSubmit = async () => {
    try {
      setCompleted("");
      const data = { title, request };
      await ticketServices.createTicket(user.token, data);
      setTitle("");
      setRequest("");
      toast.success("Ticket created successfullly!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });

      setCompleted("created successfully");
    } catch (error) {
      setError(
        "Something went wrong while we were creating that ticket, please try again!"
      );
    }
  };

  return (
    <>
      {completed ? (
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      ) : (
        ""
      )}

      {errors ? (
        <Alert
          key="2"
          variant="danger"
          show={show}
          onClose={() => setShow(false)}
          dismissible
        >
          {errors}
        </Alert>
      ) : (
        ""
      )}

      <Container className="m-auto mb-4">
        <Row className="justify-content-center mt-4">
          <Col sm={8}>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />

            <ToastContainer />
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">
                Enter a summary for your issue
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="I have a problem with the app"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">
                What issues are you having with our platform?
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                value={request}
                onChange={({ target }) => setRequest(target.value)}
              ></textarea>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <Link to="/dashboard"> Back to dashboard </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateTicket;
