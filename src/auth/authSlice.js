import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO } from 'config.js';
import { jwtDecode } from 'jwt-decode'

const token = localStorage.getItem("jwt-token");
const payload = token ? jwtDecode(token) : {};
// const test = token ? true : false ;
const initialState = {
  isLogin:IS_DEMO,
  currentUser:payload
};

console.log(initialState.currentUser);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
      state.isLogin = true;
    },

  },
});

export const { setCurrentUser } = authSlice.actions;
const authReducer = authSlice.reducer;

export default authReducer;
