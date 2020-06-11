import React from "react";
import { Menu, Footer } from "./components/Menu";
import Login from "./container/Login";
import SignUp from "./container/SignUp";
import Dashboard from "./components/Dashboard";
import Tickets from "./container/Tickets";
import TicketView from "./container/TicketView";
import CreateTicket from "./container/CreateTicket";
import Users from "./container/Users";

import { useSelector } from "react-redux";
import { usersSelector } from "./features/users/UserSlice";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import MyTickets from "./container/MyTickets";

const App = () => {
  const { user, isAdmin } = useSelector(usersSelector);

  return (
    <BrowserRouter>
      <div>
        <Menu isAdmin={isAdmin} user={user} />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/dashboard" component={Dashboard} user={user} />
          <Route path="/createticket" component={CreateTicket} />
          <Route path="/mytickets/:id" component={MyTickets} />
          <Route path="/tickets" component={Tickets} />
          <Route path="/ticket/:id" component={TicketView} />
          <Route path="/users" component={Users} />
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
