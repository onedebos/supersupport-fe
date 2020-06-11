import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Comments = ({ comments }) => {
  return (
    <Container className="m-auto mb-4">
      <Row className="justify-content-center mt-4">
        <Col sm={8}>
          {!comments ? (
            ""
          ) : (
            <div>
              {comments.map(comment => (
                <div key={comment.id}>
                  <p className="bg-light p-2">
                    <strong>{comment.user_name}: </strong>
                    <span>{comment.comment}</span>
                  </p>
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
