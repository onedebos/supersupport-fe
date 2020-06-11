import React, { useState, useEffect } from "react";
import Authentication from "../components/Authentication";
import Alert from "react-bootstrap/Alert";
import { useDispatch, useSelector } from "react-redux";
import { signUp, usersSelector } from "../features/users/UserSlice";
import { Redirect, Link } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const { user, loading, errors } = useSelector(usersSelector);

  const handleSignUp = async e => {
    e.preventDefault();
    dispatch(signUp(name, email, password, passwordConfirmation));
  };

  useEffect(() => {
    console.log(loading, user.token);

    // set token for future requests
    if (user.token) {
      localStorage.setItem("token", user.token);
    }
    return () => {};
  }, [loading, user]);

  return (
    <div>
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
        loginForm={false}
        handleAuth={handleSignUp}
        name={name}
        handleNameChange={({ target }) => setName(target.value)}
        passwordConfirmation={passwordConfirmation}
        handlePasswordConfirmation={({ target }) =>
          setPasswordConfirmation(target.value)
        }
        email={email}
        handleEmailChange={e => setEmail(e.target.value)}
        password={password}
        handlePassword={({ target }) => setPassword(target.value)}
      />
      {user.token ? <Redirect to="/dashboard" /> : ""}
      <div className="container">
        <div className="row justify-content-center mt-4">
          Already signed up? <Link to="/"> Sign in.</Link>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
