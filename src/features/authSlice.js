import { createSlice } from "@reduxjs/toolkit";

const user = sessionStorage.getItem("user");
const token = sessionStorage.getItem("token");
let initialState;

if (user) {
  initialState = {
    accessToken: `${token}`,
    isAuthorize: true,
    user: JSON.parse(user),
  };
} else {
  initialState = {
    accessToken: "",
    isAuthorize: false,
    user: {},
  };
}

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isAuthorize = true;
      state.user = action.payload.user;
    },
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
