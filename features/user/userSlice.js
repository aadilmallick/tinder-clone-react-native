import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.user = action.payload;
    },
    userLogout: (state) => {
      state.user = null;
    },
  },
});

export const { userLogin, userLogout } = userSlice.actions;

export const selectUser = (state) => {
  return state.user.user;
};

export default userSlice.reducer;
