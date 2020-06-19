import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const signupURL = "http://localhost:3000/api/v1/users";
const signinURL = "http://localhost:3000/api/v1/login";

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
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
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
      dispatch(setLoading(false));
      dispatch(
        setErrors("The username or password you have entered is incorrect")
      );
    }
  };
}

export function signUp(name, email, password, password_confirmation) {
  return async dispatch => {
    try {
      setErrors("");
      dispatch(setLoading(true));
      const response = await axios.post(
        signupURL,
        { name, email, password, password_confirmation },
        { withCredentials: true }
      );
      dispatch(setLoading(false));
      dispatch(setUser(response.data));

      // console.log(response.data);
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setErrors("Something went wrong while signing you up."));
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
