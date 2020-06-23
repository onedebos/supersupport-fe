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
  handlePasswordConfirmation,
  loading,
}) => {
  return (
    <>
      <Container className="m-auto mb-4">
        <Row className="justify-content-center mt-4 ">
          <Col sm={6}>
            <form className="needs-validation" noValidate>
              {!loginForm ? (
                <>
                  <h1 className="font-weight-bold mt-4 pb-4">Sign up</h1>
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
                <h1 className="font-weight-bold mt-4 pb-4">Sign in</h1>
              )}
              <Form.Group controlId="formBasicEmail">
                <label htmlFor="email">Email address</label>
                <div className="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">
                      @
                    </span>
                  </div>
                  <input
                    type="email"
                    className="form-control rounded-sm"
                    id="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
              </Form.Group>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">
                      #
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={handlePassword}
                  />
                </div>
              </div>
              {!loginForm ? (
                <>
                  {" "}
                  <div className="form-group">
                    <label htmlFor="password">Password confirmation</label>
                    <div className="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">
                          #
                        </span>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="enter that password again"
                        value={passwordConfirmation}
                        onChange={handlePasswordConfirmation}
                      />
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}

              {!loading ? (
                <Button variant="primary" type="submit" onClick={handleAuth}>
                  Submit
                </Button>
              ) : (
                <button className="btn btn-primary" disabled>
                  One second ....
                </button>
              )}
            </form>
            <div className=" justify-content-center row p-4 mt-4 bg-light rounded-sm">
              See sample Login details&nbsp;
              <a
                href="https://github.com/onedebos/supersupport-fe#sample-logins"
                target="_blank"
                rel="noopener noreferrer"
                className="font-weight-bold"
              >
                here{" "}
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Authentication;
