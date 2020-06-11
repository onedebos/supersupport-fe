import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Comments = ({ comments }) => {
  const styleComments = userRole => {
    if (userRole !== "customer") {
      return "p-3 mb-2 bg-primary text-light rounded-sm";
    } else {
      return "ml-3 p-3 mb-2 bg-light text-dark rounded-sm";
    }
  };

  return (
    <Container className="m-auto mb-4">
      <Row className="justify-content-center mt-4">
        <Col sm={8}>
          {!comments ? (
            ""
          ) : (
            <div className="container fluid">
              <h3>Comments</h3>
              {comments.map(comment => (
                <div key={comment.id}>
                  <div className={styleComments(comment.user_role)}>
                    <strong>
                      {comment.user_name} ({comment.user_role}):{" "}
                    </strong>
                    <span>{comment.comment}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Comments;
