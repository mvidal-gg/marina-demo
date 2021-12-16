import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../../services/auth.service";

const initialState = {
  user: {
    email: null,
    role: null,
    token: null
  },
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
  async (
    { username, password, phone_number, email, pointOfSale, role },
    { rejectWithValue }
  ) => {
    try {
      return await AuthService.signUp(
        username,
        password,
        phone_number,
        email,
        pointOfSale,
        role
      );
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

export const sendConfirmationCode = createAsyncThunk(
  "auth/sendConfirmationCode",
  async ({ email }, { rejectWithValue }) => {
    try {
      return await AuthService.sendConfirmationCode(email);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const setNewPassword = createAsyncThunk(
  "auth/setNewPassword",
  async ({ email, code, new_password }, { rejectWithValue }) => {
    try {
      return await AuthService.setNewPassword(email, code, new_password);
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
      let payload = JSON.parse(action.payload)
      state.user = {
        email:
        payload.signInUserSession.idToken.payload["cognito:username"],
        role: payload.signInUserSession.idToken.payload["custom:role"],
        token: payload.signInUserSession.idToken.jwtToken,
      };
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.user = {
        email: null,
        role: null,
        token: null
      };
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        let payload = JSON.parse(action.payload)
        state.user = {
          email:
          payload.signInUserSession.idToken.payload[
              "cognito:username"
            ],
          role: payload.signInUserSession.idToken.payload["custom:role"],
          token: payload.signInUserSession.idToken.jwtToken,
        };
        state.isLoading = false;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload.error;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = {
          email: null,
          role: null,
          token: null
        };
        state.isLoading = false;
        state.isAuthenticated = false;        
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.error;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(confirmSignUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      .addCase(confirmSignUp.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.error;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
