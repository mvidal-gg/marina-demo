import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ConsumptionsService from "../../../services/consumptions.service";

const initialState = {
  consumptions: [],
  status: "idle",
  error: null,
};

export const fetchConsumptions = createAsyncThunk(
  "consumptions/getConsumptions",
  async (userToken) => {
    const response = await ConsumptionsService.getAll(userToken);
    return response;
  }
);

const consumptionsSlice = createSlice({
  name: "consumptions",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchConsumptions.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchConsumptions.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched consumptions to the array
        state.consumptions = state.consumptions.concat(action.payload);
      })
      .addCase(fetchConsumptions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default consumptionsSlice.reducer;

export const selectAllConsumptions = (state) => state.consumptions.consumptions;

export const selectConsumptionById = (state, consumptionId) =>
  state.consumptions.find((consumption) => consumption.id === consumptionId);
