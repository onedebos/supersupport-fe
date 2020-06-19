import React, { useEffect } from "react";
import { Menu, Footer } from "./components/Menu";
import Login from "./container/Login";
import SignUp from "./container/SignUp";
import Dashboard from "./components/Dashboard";
import Tickets from "./container/Tickets";
import TicketView from "./container/TicketView";
import CreateTicket from "./container/CreateTicket";
import Users from "./container/Users";

import { useDispatch, useSelector } from "react-redux";
import { usersSelector, keepUserSignedIn } from "./features/users/UserSlice";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import MyTickets from "./container/MyTickets";

const App = () => {
  const { user, isAdmin } = useSelector(usersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    let cancelled = false;
    if (!cancelled) {
      dispatch(keepUserSignedIn());
    }
    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div>
        <Menu isAdmin={isAdmin} user={user} />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route
            path="/dashboard"
            render={props => <Dashboard {...props} user={user} />}
          />
          <Route path="/createticket" component={CreateTicket} />
          <Route path="/mytickets/:id" component={MyTickets} />
          <Route
            path="/tickets"
            render={props => <Tickets {...props} user={user} />}
          />
          <Route path="/ticket/:id" component={TicketView} />
          <Route
            path="/users"
            render={props => <Users {...props} user={user} />}
          />
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
