import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const signupURL = "https://supersupportapi.herokuapp.com/api/v1/users";
const signinURL = "https://supersupportapi.herokuapp.com/api/v1/login";

export const initialState = {
  loading: false,
  user: {},
  isAdmin: false,
  isAgent: false,
  errors: "",
  verifiedUser: {}
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setErrors: (state, { payload }) => {
      state.errors = payload;
    },
    setAdmin: (state, { payload }) => {
      state.isAdmin = payload;
    },
    logOutUser: state => {
      state.user = {};
      state.isAdmin = false;
      state.errors = "";
      localStorage.clear();
    },
    setAgent: (state, { payload }) => {
      state.isAgent = payload;
    }
  }
});

export const {
  setUser,
  setToken,
  getSignInFail,
  setLoading,
  loading,
  setErrors,
  setAdmin,
  setAgent,
  getUser,
  logOutUser,
  setVerifiedUser
} = usersSlice.actions;

export default usersSlice.reducer;

export const usersSelector = state => state.users;

export function signIn(email, password) {
  return async dispatch => {
    setErrors("");
    let response;

    try {
      dispatch(setLoading(true));
      response = await axios.post(
        signinURL,
        { email, password },
        { withCredentials: true }
      );
      dispatch(setLoading(false));
      dispatch(setUser(response.data));

      localStorage.setItem("user", JSON.stringify(response.data));

      if (response.data.user.role === "admin") {
        dispatch(setAdmin(true));
      }
      if (response.data.user.role === "agent") {
        dispatch(setAgent(true));
      }
    } catch (error) {
      setLoading(false);
      dispatch(setLoading(false));
      dispatch(
        setErrors("The username or password you have entered is incorrect")
      );
    }
  };
}

export function signUp(name, email, password, password_confirmation) {
  return async dispatch => {
    let response;
    try {
      setErrors("");
      dispatch(setLoading(true));
      response = await axios.post(
        signupURL,
        { name, email, password, password_confirmation },
        { withCredentials: true }
      );
      dispatch(setLoading(false));
      dispatch(setUser(response.data));
    } catch (error) {
      if (error.response.status === 409) {
        dispatch(setErrors("That email has already been taken."));
      }
      if (error.response.status === 422) {
        dispatch(setErrors("Please check the fields and try again."));
      }

      dispatch(setLoading(false));
    }
  };
}

export function keepUserSignedIn() {
  return dispatch => {
    setErrors("");
    const user = localStorage.getItem("user");
    if (user) {
      const signedInUser = JSON.parse(user);
      dispatch(setUser(signedInUser));

      if (signedInUser.user.role === "admin") {
        dispatch(setAdmin(true));
      }
      if (signedInUser.user.role === "agent") {
        dispatch(setAgent(true));
      }
    }
  };
}
