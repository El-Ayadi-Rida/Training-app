import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const getuserFromToken = () => {
  const token = localStorage.getItem('token'); // or sessionStorage, depending on where you store your token
  if (token) {
    const decoded = jwtDecode(token);
    const user = {...decoded , role:"learner"}
    console.log(user);
    return user; // Make sure the payload contains the 'role' you set on the server side
  }
  return null;
};

const initialState = {
  isLogin: !!getuserFromToken(),
  accessToken: localStorage.getItem('token')|| null,
  refreshToken: localStorage.getItem('refreshToken')|| null,
  currentUser: getuserFromToken(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isLogin = true;
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.currentUser = null;
      state.isLogin = false;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    },
  },
});



export const { setTokens, setCurrentUser, logout } = authSlice.actions;
export default authSlice.reducer;
