import { configureStore } from '@reduxjs/toolkit'
import consumptionsReducer from '../features/consumptions/consumptionsSlice'
import pointsOfSaleReducer from '../features/pointsOfSale/pointsOfSaleSlice'

export default configureStore({
  reducer: {
      consumptions: consumptionsReducer,
      pointsOfSale: pointsOfSaleReducer,
  }
})