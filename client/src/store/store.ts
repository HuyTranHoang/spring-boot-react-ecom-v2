import { configureStore } from '@reduxjs/toolkit'

import basketReducer from '../features/basket/basketSlice.ts'
import catalogReducer from '../features/catalog/catalogSlice.ts'
import { useDispatch } from 'react-redux'

const store = configureStore({
  reducer: {
    basket: basketReducer,
    catalog: catalogReducer
  }
})

export default store
export type IRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()