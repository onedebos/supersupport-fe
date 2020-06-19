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
    if (comment.length < 1) {
      return setError("You have not entered a comment");
    } else {
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
    }
  };

  const handleCloseTicket = async () => {
    const updateStatus = {
      status: "completed"
    };
    const response = await ticketServices.updateTicket(
      id,
      user.token,
      updateStatus
    );
    setTicket(response.data.ticket);
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
    const response = await ticketServices.updateTicket(
      id,
      user.token,
      updateStatus
    );

    setTicket(response.data.ticket);
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

  const handleDeleteTicket = async () => {
    try {
      await ticketServices.deleteTicket(id, user.token);
      toast.error("Ticket deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    } catch (error) {
      console.log("ticket not deleted");
    }
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
  }, [id, user.token, comment]);

  const styleTicketStatus = ticketStatus => {
    if (ticketStatus === "opened") {
      return "p-2 mb-2 bg-light text-dark rounded-sm";
    } else if (ticketStatus === "in_progress") {
      return "p-2 mb-2 bg-secondary text-white rounded-sm";
    } else if (ticketStatus === "completed") {
      return "p-2 mb-2 bg-success text-white rounded-sm";
    }
  };

  if (!user.user) {
    return <></>;
  }

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
              <h1 className="font-weight-bold">{ticket.title}</h1>
              <p>{ticket.request}</p>
              <p className={styleTicketStatus(ticket.status)}>
                <strong>Status: </strong>
                {""}
                {ticket.status === "in_progress"
                  ? "In progress"
                  : ticket.status}
              </p>

              {comments.length >= 1 ? (
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
            <div className="form-group mt-4 pt-4">
              <span>
                <input
                  type="text"
                  className="form-control mb-3"
                  id="exampleFormControlInput1"
                  placeholder="enter a comment"
                  value={comment}
                  onChange={({ target }) => setComment(target.value)}
                />
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={handleComment}
                >
                  Post Comment
                </button>
              </span>
              {user.user.role === "customer" ? (
                ""
              ) : (
                <>
                  <button
                    className="btn btn-warning ml-4"
                    onClick={handleInProgress}
                  >
                    In progress
                  </button>
                  <button
                    className="btn btn-danger ml-1"
                    onClick={handleCloseTicket}
                  >
                    Close ticket
                  </button>
                  {user.user.role === "admin" ? (
                    <>
                      <button
                        className="btn btn-danger ml-1 mt-4"
                        onClick={handleDeleteTicket}
                      >
                        Delete ticket
                      </button>
                    </>
                  ) : (
                    <> </>
                  )}
                </>
              )}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TicketView;
