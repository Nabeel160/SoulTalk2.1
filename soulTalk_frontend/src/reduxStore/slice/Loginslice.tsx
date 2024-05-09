import { createSlice } from '@reduxjs/toolkit';

const Loginslice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});
export const { login, logout } = Loginslice.actions;
export default Loginslice;