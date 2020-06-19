import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Comments = ({ comments }) => {
  const styleComments = userRole => {
    if (userRole !== "customer") {
      return "p-3 mb-2 bg-primary text-light rounded-sm";
    } else {
      return "ml-3 p-3 mb-2 bg-customer text-dark rounded-sm";
    }
  };

  if (!comments) {
    return <></>;
  }

  return (
    <Container className="m-auto mb-4 bg-light rounded-sm pt-2 pb-4">
      <Row className="justify-content-center mt-4">
        <Col>
          <div className="container  ">
            <h3 className="font-weight-bold mb-2">Comments on this ticket</h3>
            {comments.map(comment => (
              <div key={comment.id}>
                <div className={styleComments(comment.user_role)}>
                  <span>
                    {comment.user_name} <strong>({comment.user_role}):</strong>{" "}
                  </span>
                  <span>{comment.comment}</span>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Comments;
