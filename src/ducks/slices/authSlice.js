import { createSlice } from "@reduxjs/toolkit";
import { authCodes } from "../../constants";

const initState = {
  isOk: undefined,
  message: undefined,
  user: undefined,
  accessToken: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    doLogin() {},
    doSignup() {},
    doLogout() {},
    doRefreshToken() {},

    doGetUser() {},
    doEditUser() {},

    authSuccess(state, action) {
      return action.payload;
    },

    authFail(state, action) {
      return action.payload;
    },

    resetAuth(state) {
      if (state.message === authCodes["010"]) {
        return { ...state, message: undefined };
      }
      return initState;
    },
  },
});

export const {
  doLogin,
  doSignup,
  authSuccess,
  authFail,
  resetAuth,
  doLogout,
  doEditUser,
  doGetUser,
  doRefreshToken,
} = authSlice.actions;

export default authSlice.reducer;
