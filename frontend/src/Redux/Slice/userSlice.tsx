// userSlice.ts

import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  user: {
    username: string;
    email: string;
    pic: string;
    token: string | null;
  };
}

const initialState: UserState = {
  user: {
    username: '',
    email: '',
    pic: '',
    token: null,
  },
};

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    changePic: (state, action) => {
      state.user.pic = action.payload;
    },
    loginSuccess: (state, action) => {
      const { username, email, pic, token } = action.payload;
      state.user.username = username;
      state.user.email = email;
      state.user.pic = pic;
      state.user.token = token;
      window.location.href = '/home';
    },
    loginFailure: (state) => {
      // Reset user state on login failure
      state.user = initialState.user;
    },
    logout: (state ) => {
      // Reset user state on logout
      localStorage.removeItem('userInfo');
      
      state.user.username = "";
      state.user.email = "";
      state.user.pic = "";
      state.user.token = null;
    },
  },
});

export const {
  changePic,
  loginSuccess,
  loginFailure,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
