import Basket from '../../type/basket.type.ts'
import { createSlice } from '@reduxjs/toolkit'

const initialState: Basket = {
  id: 0,
  buyerId: '',
  basketItems: []
}

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBuyerId: (state, action) => {
      state.buyerId = action.payload
    },
    setBasketItems: (state, action) => {
      state.basketItems = action.payload
    },
    addItem: (state, action) => {
      if (state.basketItems.some((item) => item.productId === action.payload.productId)) {
        const index = state.basketItems.findIndex((item) => item.productId === action.payload.productId)
        state.basketItems[index].quantity += 1
        return
      }

      state.basketItems.push(action.payload)
    },
    removeItem: (state, action) => {
      state.basketItems = state.basketItems.filter((item) => item.productId !== action.payload)
    },
    updateItem: (state, action) => {
      const index = state.basketItems.findIndex((item) => item.productId === action.payload.productId)
      state.basketItems[index].quantity = action.payload.quantity
    },
    clearBasket: (state) => {
      state.basketItems = []
    }
  }
})

export const { setBuyerId, setBasketItems, addItem, removeItem, updateItem, clearBasket } = basketSlice.actions
export default basketSlice.reducer

export const selectBasket = (state: { basket: Basket }) => state.basket
