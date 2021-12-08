import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../../services/auth.service";

const initialState = {
  user: null,
  isAuthenticated: false,
  userRole: null,
  isLoading: true,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, newPassword }) => {
    try {
      const response = await AuthService.login(email, password, newPassword);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.userRole = action.payload.signInUserSession.idToken.payload["cognito:groups"][0];
      state.isAuthenticated = true
      state.isLoading = false
    },
    cleanUser: (state, action) => {
      state.user = null;
      state.userRole = null;
      state.isAuthenticated = false
      state.isLoading = false
    }
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.userRole = action.payload.signInUserSession.idToken.payload["cognito:groups"][0];
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.userRole = null;
        state.user = null;
      })
  },
});

export const { setUser, cleanUser } = authSlice.actions

export default authSlice.reducer;
