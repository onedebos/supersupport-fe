import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Authentication = ({
  loginForm,
  handleAuth,
  email,
  password,
  handleEmailChange,
  handlePassword,
  name,
  handleNameChange,
  passwordConfirmation,
  handlePasswordConfirmation
}) => {
  return (
    <>
      <Container className="m-auto mb-4">
        <Row className="justify-content-center mt-4">
          <Col sm={8}>
            <form className="needs-validation" noValidate>
              {!loginForm ? (
                <>
                  <h1>Sign up</h1>
                  <div className="form-group">
                    <label htmlFor="validationCustom01">Name</label>
                    <input
                      type="name"
                      className="form-control"
                      id="validationCustom01"
                      placeholder="firstname"
                      value={name}
                      onChange={handleNameChange}
                      required
                    />
                  </div>
                </>
              ) : (
                <h1>Sign in</h1>
              )}
              <Form.Group controlId="formBasicEmail">
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </div>
              </Form.Group>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={handlePassword}
                />
              </div>
              {!loginForm ? (
                <>
                  {" "}
                  <div className="form-group">
                    <label htmlFor="password">Password confirmation</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={passwordConfirmation}
                      onChange={handlePasswordConfirmation}
                    />
                  </div>
                </>
              ) : (
                ""
              )}

              <Button variant="primary" type="submit" onClick={handleAuth}>
                Submit
              </Button>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Authentication;
