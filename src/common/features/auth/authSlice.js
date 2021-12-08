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
  async ({ email, password, newPassword }, { rejectWithValue }) => {
    try {
      return await AuthService.login(email, password, newPassword);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

export const confirmSignUp = createAsyncThunk(
  "auth/confirmSignUp",
  async ({ username, code, codeTemp }, { rejectWithValue }) => {
    try {
      return await AuthService.confirmSignUp(username, code, codeTemp);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ username, password, phone_number, email, pointOfSale, role }, { rejectWithValue }) => {
    try {
      return await AuthService.signUp(username, password, phone_number, email, pointOfSale, role);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const completePassword = createAsyncThunk(
  "auth/completePassword",
  async ({ email, password, newPassword }, { rejectWithValue }) => {
    try {
      return await AuthService.completePassword(email, password, newPassword);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.userRole =
        action.payload.signInUserSession.idToken.payload["cognito:groups"][0];
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.userRole = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
        state.userRole =
          action.payload.signInUserSession.idToken.payload["cognito:groups"][0];
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload.error;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.userRole = null;
        state.user = null;
      })
      .addCase(confirmSignUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
        state.userRole = null;
      })
      .addCase(confirmSignUp.rejected, (state, action) => {
        state.error = action.payload.error;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
