import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const signupURL = "http://localhost:3000/api/v1/users";
const signinURL = "http://localhost:3000/api/v1/login";
const verifyUserURL = "http://localhost:3000/api/v1/verifyuser";

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
    setVerifiedUser: (state, { payload }) => {
      state.verifiedUser = payload;
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
    logOutUser: (state, { payload }) => {
      state.user = {};
      state.isAdmin = false;
      localStorage.clear();
    }
  }
});

export const {
  setUser,
  setToken,
  getSignInFail,
  setLoading,
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
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        signinURL,
        { email, password },
        { withCredentials: true }
      );
      dispatch(setLoading(false));
      dispatch(setUser(response.data));

      localStorage.setItem("token", response.data.token);

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

export function verifyUser(token) {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(verifyUserURL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(setLoading(false));
      dispatch(setUser(response.data));
      console.log(response.data);
      if (response.data.user.role === "admin") {
        dispatch(setAdmin(true));
      }
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        setErrors("The username or password you have entered is incorrect")
      );
    }
  };
}
