// move ticket fetching to happen at Admin Sign in for faster loads

import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  tickets: []
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setTicketsState: (state, { payload }) => {
      state.tickets = payload;
    }
  }
});

export const { setTicketsState } = ticketsSlice.actions;

export default ticketsSlice.reducer;

export const ticketsSelector = state => state.tickets;
