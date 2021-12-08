import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import consumptionsReducer from "../features/consumptions/consumptionsSlice";
import pointsOfSaleReducer from "../features/pointsOfSale/pointsOfSaleSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    consumptions: consumptionsReducer,
    pointsOfSale: pointsOfSaleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["auth/setUser"],
      },
    }),
});
