import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.scss";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import usersSliceReducer from "./features/users/UserSlice";
import ticketsSliceReducer from "./features/tickets/TicketsSlice";

const store = configureStore({
  reducer: { users: usersSliceReducer, tickets: ticketsSliceReducer }
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
