import { configureStore } from '@reduxjs/toolkit'

import basketReducer from '../features/basket/basketSlice.ts'

const store = configureStore({
  reducer: {
    basket: basketReducer,
  }
})

export default store
export type IRootState = ReturnType<typeof store.getState>