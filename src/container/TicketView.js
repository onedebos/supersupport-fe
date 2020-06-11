import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import { usersSelector } from "../features/users/UserSlice";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ticketServices from "../services/tickets";
import commentServices from "../services/comments";
import Comments from "../components/Comments";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TicketView = ({ match }) => {
  const { user } = useSelector(usersSelector);
  const [ticket, setTicket] = useState();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const id = match.params.id;

  const handleComment = async () => {
    const data = { comment };
    await commentServices.createComment(id, user.token, data);
    const response = await ticketServices.getSpecificTicket(id, user.token);
    toast.success("Comment posted!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
    setTicket(response.data.ticket);
    setComments(response.data.comments);
  };

  const handleCloseTicket = async () => {
    const updateStatus = {
      status: "completed"
    };
    await ticketServices.updateTicket(id, user.token, updateStatus);
    toast.success("Status updated!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  };

  const handleInProgress = async () => {
    const updateStatus = {
      status: "in_progress"
    };
    await ticketServices.updateTicket(id, user.token, updateStatus);
    toast.success("Status updated!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  };
  useEffect(() => {
    const getTicket = async () => {
      try {
        const response = await ticketServices.getSpecificTicket(id, user.token);

        setTicket(response.data.ticket);
        setComments(response.data.comments);
      } catch (error) {
        setError("We couldn't find a ticket with that ID");
      }
    };

    getTicket();
  }, []);

  return (
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
          {error ? <div>{error}</div> : ""}
          {ticket ? (
            <div>
              <h1>{ticket.title}</h1>
              <p>{ticket.request}</p>
              <small>
                <strong>Status:</strong>
                {""}
                {ticket.status}
              </small>

              {comments.length > 1 ? (
                <Comments comments={comments} />
              ) : (
                <div>There are no comments for this ticket. </div>
              )}
            </div>
          ) : (
            ""
          )}

          {comments.length === 0 && user.user.role === "customer" ? (
            <div>A support agent must comment before you can comment</div>
          ) : (
            <div className="form-group">
              <span>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="enter a comment"
                  value={comment}
                  onChange={({ target }) => setComment(target.value)}
                />
                <button className="btn-primary" onClick={handleComment}>
                  Post
                </button>
              </span>
              {user.user.role === "customer" ? (
                ""
              ) : (
                <div>
                  <button className="btn-primary" onClick={handleInProgress}>
                    In progress
                  </button>
                  <button className="btn-danger" onClick={handleCloseTicket}>
                    Close ticket
                  </button>
                </div>
              )}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TicketView;
