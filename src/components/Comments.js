import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Comments = ({ comments }) => {
  const styleComments = userRole => {
    if (userRole !== "customer") {
      return "p-3 mb-2 bg-dark text-light";
    } else {
      return "ml-3 p-3 mb-2 bg-light text-dark";
    }
  };

  return (
    <Container className="m-auto mb-4">
      <Row className="justify-content-center mt-4">
        <Col sm={8}>
          {!comments ? (
            ""
          ) : (
            <div>
              <h3>Comments</h3>
              {comments.map(comment => (
                <div key={comment.id} className="">
                  <div className={styleComments(comment.user_role)}>
                    <strong>{comment.user_name}: </strong>
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
