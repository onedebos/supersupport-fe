import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link, useHistory } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import "../styles/Menu.scss";
import { useDispatch } from "react-redux";
import { logOutUser } from "../features/users/UserSlice";

export const Menu = ({ isAdmin, user }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = e => {
    e.preventDefault();
    dispatch(logOutUser());
    history.push("/");
  };

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/">SuperSupport</Navbar.Brand>
        <Nav className="ml-auto">
          {user.token ? (
            <>
              {" "}
              <Link className="nav-link" to="/createticket">
                Create a ticket
              </Link>
              {user.user.role !== "admin" && user.user.role !== "agent" ? (
                <Link
                  to={`/mytickets/${user.user.user_id}`}
                  className="nav-link"
                >
                  My Tickets
                </Link>
              ) : (
                ""
              )}
              {isAdmin ? (
                <>
                  <Link to="/users" className="nav-link">
                    Users
                  </Link>{" "}
                  <Link to="/tickets" className="nav-link">
                    All tickets
                  </Link>{" "}
                </>
              ) : (
                ""
              )}
              {user.user.role !== "customer" && user.user.role !== "admin" ? (
                <>
                  <Link to="/tickets" className="nav-link">
                    All tickets
                  </Link>{" "}
                </>
              ) : (
                ""
              )}
              <Link to="/" className="nav-link" onClick={e => handleLogout(e)}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link">
                Sign up
              </Link>
            </>
          )}
        </Nav>
      </Navbar>
    </>
  );
};

export const Footer = () => {
  return (
    <div className="page-footer">
      <footer className="footer bg-primary p-4">
        <div className="container text-center">
          <p className="text-white">
            <span className="font-weight-bold">SuperSupport</span>{" "}
            <span>providing support solutions since 2020.</span>
          </p>
        </div>
      </footer>
    </div>
  );
};
