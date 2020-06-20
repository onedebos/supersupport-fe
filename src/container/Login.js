import React, { useState } from "react";
import Authentication from "../components/Authentication";
import Alert from "react-bootstrap/Alert";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn, usersSelector } from "../features/users/UserSlice";

const Login = () => {
  const [email, setEmail] = useState("");

  const [show, setShow] = useState(true);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { user, errors, loading } = useSelector(usersSelector);

  const handleLogin = async e => {
    e.preventDefault();
    dispatch(signIn(email, password));
  };

  return (
    <>
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

      <Authentication
        loginForm={true}
        handleAuth={handleLogin}
        email={email}
        handleEmailChange={e => setEmail(e.target.value)}
        password={password}
        loading={loading}
        handlePassword={({ target }) => setPassword(target.value)}
      />
      <div>{user.token ? <Redirect to="/dashboard" /> : <> </>}</div>
      <div className="container">
        <div className="justify-content-center row pt-4 font-weight-bold">
          Don't have an account?
          <Link to="/signup">&nbsp;Sign up</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
