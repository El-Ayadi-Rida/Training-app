import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  accessToken: localStorage.getItem('token')|| null,
  refreshToken: localStorage.getItem('refreshToken')|| null,
  currentUser: {},
  isLogin: false,
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
      state.currentUser = {};
      state.isLogin = false;
    },
  },
});



export const { setTokens, setCurrentUser, logout } = authSlice.actions;
export default authSlice.reducer;
