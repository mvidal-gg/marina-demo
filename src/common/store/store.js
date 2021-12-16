import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import consumptionsReducer from "../features/consumptions/consumptionsSlice";
import pointsOfSaleReducer from "../features/pointsOfSale/pointsOfSaleSlice";

const combinedReducer = combineReducers({
  auth: authReducer,
  consumptions: consumptionsReducer,
  pointsOfSale: pointsOfSaleReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout/fulfilled") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
